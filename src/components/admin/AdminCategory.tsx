"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

type Category = {
  id: string;
  name: string;
};

const AdminCategory = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast({ title: "Error al cargar categorías" });
      return;
    }

    setCategories(data || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({ title: "Nombre requerido" });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("categories").insert({
      name: name.trim(),
    });

    if (error) {
      toast({
        title: "❌ Error",
        description: error.message.includes("duplicate")
          ? "La categoría ya existe"
          : "No se pudo crear",
      });
    } else {
      toast({ title: "✅ Categoría creada" });
      setName("");
      fetchCategories();
    }

    setLoading(false);
  };

  return (
    <section className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-card p-6 rounded-lg shadow"
        >
          <h3 className="text-lg font-bold">Crear Categoría</h3>

          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Categoría"}
          </Button>
        </form>

        {/* LIST */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Categorías</h3>

          {categories.length === 0 ? (
            <p className="text-muted-foreground">
              No hay categorías aún
            </p>
          ) : (
            <ul className="space-y-2">
              {categories.map((c) => (
                <li
                  key={c.id}
                  className="p-3 border rounded bg-background"
                >
                  {c.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminCategory;
