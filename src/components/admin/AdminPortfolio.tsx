"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type Category = {
  id: string;
  name: string;
};

const AdminPortfolio = () => {
  const { toast } = useToast();

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // ⛔ Evita hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔒 Supabase SOLO cuando el cliente está montado
  useEffect(() => {
    if (!mounted) return;

    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      if (data && data.length > 0) {
        setCategories(data);
        setSelectedCategory(data[0].name);
      }
    };

    fetchCategories();
  }, [mounted]);

  if (!mounted) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const title = formData.get("name") as string;
    const description = formData.get("description") as string;
    const type = selectedCategory;

    try {
      let imageUrl = "";

      if (imageFile) {
        const fileName = `${crypto.randomUUID()}-${imageFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from("portfolio-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("portfolio-images")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      const { error } = await supabase.from("portfolios").insert({
        title,
        type,
        description,
        image_url: imageUrl,
      });

      if (error) throw error;

      toast({
        title: "✅ Portafolio agregado",
        description: "Proyecto guardado correctamente",
      });

      e.currentTarget.reset();
      setImageFile(null);
    } catch (err) {
      console.error(err);
      toast({
        title: "❌ Error",
        description: "No se pudo guardar el proyecto",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Agregar Portafolio</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg shadow">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del proyecto</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="space-y-2">
            <Label>Categoría</Label>
            {categories.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No hay categorías creadas
              </p>
            ) : (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" name="description" rows={4} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Imagen</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Agregar Portafolio"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AdminPortfolio;
