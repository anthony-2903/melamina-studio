"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  categories?: { name: string }[] | any;
}

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      const { data, error } = await supabase
        .from("portfolios")
        .select(`id, title, description, image_url, categories ( name )`)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error:", error);
      } else {
        const safeData = (data ?? []).map((p: any) => ({
          ...p,
          categories: Array.isArray(p.categories) ? p.categories : [p.categories],
        }));
        setPortfolios(safeData);
      }
      setLoading(false);
    };
    fetchPortfolios();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-[#BB9E7A] animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-20 bg-white w-full">
      <div className="container mx-auto px-4">
        
        {/* GRID PRINCIPAL: 3 columnas grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {portfolios.map((p, index) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] cursor-pointer"
              >
                {/* IMAGEN DE FONDO: Ocupa toda la carta */}
                <img 
                  src={p.image_url} 
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-110" 
                />
                
                {/* OVERLAY: Gradiente sutil para que el texto resalte */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* CONTENIDO DE TEXTO: Posicionado como en la referencia */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="space-y-1">
                    {/* CATEGORÍA EN DORADO/MÉXICO */}
                    <p className="text-[#BB9E7A] text-[10px] font-bold uppercase tracking-[0.3em] opacity-80 mb-2">
                      {p.categories?.[0]?.name || "CONCEPTO"}
                    </p>
                    
                    {/* TÍTULO SERIF (Elegante y con cuerpo) */}
                    <h3 className="text-white text-3xl md:text-4xl font-serif italic leading-[1.1] max-w-[90%]">
                      {p.title}
                    </h3>

                    {/* DESCRIPCIÓN: Aparece suavemente al hacer hover */}
                    <p className="text-white/70 text-sm font-light leading-relaxed max-w-[85%] h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-700 overflow-hidden">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* BORDE DECORATIVO INTERNO (Sutil) */}
                <div className="absolute inset-6 border border-white/10 rounded-[1.8rem] pointer-events-none group-hover:border-white/30 transition-colors duration-700" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ESTADO SI NO HAY DATOS */}
        {portfolios.length === 0 && (
          <div className="text-center py-40">
            <p className="text-[#524F4A]/30 font-light tracking-[0.5em] uppercase text-xs">
              Esperando nuevas colecciones
            </p>
          </div>
        )}
      </div>
    </section>
  );
}