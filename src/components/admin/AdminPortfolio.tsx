"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";

type Category = {
  id: string;
  name: string;
};

type Portfolio = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  categories: {
    name: string;
  }[]; // 👈 ES ARRAY
};


const AdminPortfolio = () => {
  const { toast } = useToast();

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  // ─────────────────────────────────────
  // MOUNT
  // ─────────────────────────────────────
  useEffect(() => {
    setMounted(true);
  }, []);

  // ─────────────────────────────────────
  // FETCH CATEGORIES + PORTFOLIOS
  // ─────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;

    fetchCategories();
    fetchPortfolios();
  }, [mounted]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("id, name")
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      setCategories(data);
      setSelectedCategory(data[0].id);
    }
  };

  const fetchPortfolios = async () => {
    const { data, error } = await supabase
      .from("portfolios")
      .select(`
        id,
        title,
        description,
        image_url,
        categories ( name )
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPortfolios(data as Portfolio[]);
    }
  };

  if (!mounted) return null;

  // ─────────────────────────────────────
  // IMAGE
  // ─────────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // ─────────────────────────────────────
  // CREATE PORTFOLIO
  // ─────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("name") as string;
    const description = formData.get("description") as string;

    try {
      let imageUrl = "";

      if (imageFile) {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", uploadPreset);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: data }
        );

        const file = await res.json();
        imageUrl = file.secure_url;
      }

      const { error } = await supabase.from("portfolios").insert({
        title,
        description,
        image_url: imageUrl,
        category_id: selectedCategory,
      });

      if (error) throw error;

      toast({ title: "✅ Portafolio agregado" });

      e.currentTarget.reset();
      setImageFile(null);
      fetchPortfolios();
    } catch (err) {
      toast({
        title: "❌ Error",
        description: "No se pudo guardar",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────
  const handleDelete = async (id: string) => {
    const ok = confirm("¿Eliminar este proyecto?");
    if (!ok) return;

    await supabase.from("portfolios").delete().eq("id", id);
    fetchPortfolios();
  };

  return (
    <section className="space-y-10">
      {/* ───────── FORM ───────── */}
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Nuevo Portafolio</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-card p-6 rounded-xl shadow"
        >
          <div>
            <Label>Nombre</Label>
            <Input name="name" required />
          </div>

          <div>
            <Label>Categoría</Label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Descripción</Label>
            <Textarea name="description" rows={3} />
          </div>

          <div>
            <Label>Imagen</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <Button disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Agregar"}
          </Button>
        </form>
      </div>

      {/* ───────── GRID ───────── */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Portafolios</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((p) => (
            <div
              key={p.id}
              className="rounded-xl overflow-hidden bg-card shadow hover:shadow-xl transition"
            >
              <img
                src={p.image_url}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg">{p.title}</h3>

                {p.categories.length > 0 && (
                  <span className="text-xs bg-orange-200 px-2 py-1 rounded">
                    {p.categories[0].name}
                  </span>
                )}


                <p className="text-sm text-muted-foreground">
                  {p.description}
                </p>

                <div className="flex justify-end gap-2 pt-2">
                  <Button size="icon" variant="outline">
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminPortfolio;
