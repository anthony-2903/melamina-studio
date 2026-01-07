"use client";

import { useEffect, useState, useRef } from "react";
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
  categories: { name: string }[] | null;
};

const AdminPortfolio = () => {
  const { toast } = useToast();

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  const formRef = useRef<HTMLFormElement>(null); // Ref to reset form

  // ─────────────────────────────
  // MOUNT
  // ─────────────────────────────
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    fetchCategories();
    fetchPortfolios();
  }, [mounted]);

  // ─────────────────────────────
  // FETCH
  // ─────────────────────────────
  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("id, name")
      .order("created_at", { ascending: false });

    if (data?.length) {
      setCategories(data);
      setSelectedCategory(data[0].id);
    }
  };

  const fetchPortfolios = async () => {
    const { data } = await supabase
      .from("portfolios")
      .select(
        `
        id,
        title,
        description,
        image_url,
        categories ( name )
      `
      )
      .order("created_at", { ascending: false });

    const safeData = (data ?? []).map((p: any) => ({
      ...p,
      categories: Array.isArray(p.categories) ? p.categories : [],
    }));

    setPortfolios(safeData);
  };

  if (!mounted) return null;

  // ─────────────────────────────
  // IMAGE
  // ─────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
  };

  // ─────────────────────────────
  // CREATE
  // ─────────────────────────────
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

      toast({
        title: "Portafolio creado",
        description: "Se agregó correctamente",
        className: "bg-green-100 text-green-900 border-green-300",
      });

      // Reset form and states
      formRef.current?.reset();
      setImageFile(null);
      setSelectedCategory(categories[0]?.id ?? "");

      fetchPortfolios();
    } catch {
      toast({
        title: "Error",
        description: "No se pudo guardar",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─────────────────────────────
  // DELETE
  // ─────────────────────────────
  const handleDelete = async (id: string) => {
    await supabase.from("portfolios").delete().eq("id", id);

    toast({
      title: "Portafolio eliminado",
      description: "El registro fue borrado",
      variant: "destructive",
    });

    fetchPortfolios();
  };

  return (
    <section className="space-y-12 px-2 sm:px-4">
      {/* ───────── FORM ───────── */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Nuevo Portafolio</h2>

        <form
          ref={formRef}
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

          <Button className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Agregar"}
          </Button>
        </form>
      </div>

      {/* ───────── GRID ───────── */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Portafolios</h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {portfolios.map((p) => (
            <div
              key={p.id}
              className="rounded-xl overflow-hidden bg-card shadow hover:shadow-xl transition"
            >
              {p.image_url && (
                <img
                  src={p.image_url}
                  className="w-full aspect-[4/3] object-cover"
                />
              )}

              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg">{p.title}</h3>

                {(p.categories?.length ?? 0) > 0 && (
                  <span className="inline-block text-xs bg-orange-200 px-2 py-1 rounded">
                    {p.categories![0].name}
                  </span>
                )}

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {p.description}
                </p>

                <div className="flex justify-end gap-2 pt-3">
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
