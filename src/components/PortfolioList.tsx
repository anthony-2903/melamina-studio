"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent } from "@/components/ui/card";

interface PortfolioItem {
  id: string;
  title: string;
  type: string;
  description: string;
  image_url?: string;
  created_at?: string;
}

export default function PortfolioList() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from("portfolios") // 👈 nombre exacto de tu tabla
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error al cargar portafolios:", error);
      else setPortfolio(data || []);

      setLoading(false);
    };

    fetchPortfolio();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando proyectos...</p>;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {portfolio.map((item) => (
          <Card key={item.id} className="overflow-hidden shadow-md">
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            <CardContent className="p-4">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.type}</p>
              <p className="mt-2 text-gray-700">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {portfolio.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          <p>No hay proyectos en el portafolio aún.</p>
        </div>
      )}
    </section>
  );
}
