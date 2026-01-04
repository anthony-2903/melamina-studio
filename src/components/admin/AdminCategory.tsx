"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

const AdminCategory = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await supabase.from("categories").select("*").order("created_at", { ascending: false });
    if (res && res.data) setCategories(res.data as any[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return toast({ title: "Nombre requerido" });

    const { error } = await supabase.from("categories").insert([
      {
        name,
        description,
      },
    ]);

    if (error) {
      toast({ title: "Error al crear categoría" });
    } else {
      toast({ title: "Categoría creada" });
      setName("");
      setDescription("");
      fetchCategories();
    }
  };

  return (
    <section className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold">Crear Categoría</h3>
          <div className="space-y-2">
            <Label htmlFor="cat-name">Nombre</Label>
            <Input id="cat-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cat-desc">Descripción</Label>
            <Textarea id="cat-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </div>

          <Button type="submit">Crear Categoría</Button>
        </form>

        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Categorías</h3>
          {loading ? (
            <p>Cargando categorías...</p>
          ) : categories.length === 0 ? (
            <p className="text-muted-foreground">No hay categorías aún.</p>
          ) : (
            <ul className="space-y-3">
              {categories.map((c) => (
                <li key={c.id} className="p-3 bg-background rounded border border-border">
                  <strong className="block">{c.name}</strong>
                  {c.description && <span className="text-sm text-muted-foreground">{c.description}</span>}
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
