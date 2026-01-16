"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Upload, Image as ImageIcon, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Category = { id: string; name: string; };
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    fetchCategories();
    fetchPortfolios();
  }, [mounted]);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("id, name").order("name");
    if (data?.length) {
      setCategories(data);
      setSelectedCategory(data[0].id);
    }
  };

  const fetchPortfolios = async () => {
    const { data } = await supabase.from("portfolios").select(`id, title, description, image_url, categories ( name )`).order("created_at", { ascending: false });
    const safeData = (data ?? []).map((p: any) => ({
      ...p,
      categories: Array.isArray(p.categories) ? p.categories : [],
    }));
    setPortfolios(safeData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageFile) {
      toast({ title: "Imagen requerida", description: "Por favor sube una foto del trabajo.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("name") as string;
    const description = formData.get("description") as string;

    try {
      let imageUrl = "";
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: data });
      const file = await res.json();
      imageUrl = file.secure_url;

      const { error } = await supabase.from("portfolios").insert({
        title, description, image_url: imageUrl, category_id: selectedCategory,
      });

      if (error) throw error;

      toast({ title: "¡Éxito!", description: "Proyecto añadido al portafolio.", className: "bg-slate-900 text-white" });
      formRef.current?.reset();
      setImageFile(null);
      setImagePreview(null);
      fetchPortfolios();
    } catch (err) {
      toast({ title: "Error", description: "No se pudo subir el proyecto.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este proyecto?")) return;
    await supabase.from("portfolios").delete().eq("id", id);
    toast({ title: "Eliminado", description: "El proyecto ha sido removido.", variant: "destructive" });
    fetchPortfolios();
  };

  if (!mounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* SECCIÓN SUPERIOR: FORMULARIO */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Añadir Nuevo Trabajo</h2>
            <p className="text-sm text-slate-500">Sube las fotos de tus últimos proyectos terminados.</p>
          </div>
          <div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
            <Plus size={20} />
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Columna Izquierda: Datos */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Título del Proyecto</Label>
              <Input name="name" placeholder="Ej: Cocina Integral Minimalista" className="h-12 rounded-xl border-slate-200 focus:ring-orange-500" required />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Categoría</Label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 border border-slate-200 rounded-xl px-4 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Detalles del Trabajo</Label>
              <Textarea name="description" placeholder="Describe los materiales, colores y acabados..." rows={4} className="rounded-xl border-slate-200" />
            </div>

            <Button disabled={isSubmitting} className="w-full h-12 rounded-xl bg-slate-950 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-slate-200">
              {isSubmitting ? <><Loader2 className="mr-2 animate-spin" size={18} /> Guardando...</> : "Publicar Proyecto"}
            </Button>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Imagen de Portafolio</Label>
            <div className={`relative group border-2 border-dashed rounded-[2rem] transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] ${imagePreview ? 'border-transparent' : 'border-slate-200 hover:border-orange-400 bg-slate-50'}`}>
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full absolute inset-0 object-cover rounded-[2rem]" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] flex items-center justify-center">
                    <Button type="button" variant="destructive" size="sm" onClick={() => {setImagePreview(null); setImageFile(null);}} className="rounded-full">
                      <X size={16} className="mr-1" /> Cambiar foto
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center p-10">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-slate-400 group-hover:text-orange-600 transition-colors">
                    <Upload size={28} />
                  </div>
                  <p className="text-sm font-bold text-slate-900">Haz clic para subir imagen</p>
                  <p className="text-xs text-slate-400 mt-1">Recomendado: 1200x900px (JPG/PNG)</p>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* GRID DE TRABAJOS PUBLICADOS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold text-slate-900">Proyectos Publicados</h2>
          <span className="px-4 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest">
            {portfolios.length} Trabajos
          </span>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {portfolios.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                      {p.categories?.[0]?.name || "Sin categoría"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2 truncate">{p.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-6">{p.description}</p>
                  
                  <div className="flex gap-2 border-t border-slate-50 pt-4">
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl h-10 border-slate-100 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider">
                      <Pencil size={14} className="mr-2" /> Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(p.id)}
                      className="rounded-xl h-10 border-slate-100 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {portfolios.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <ImageIcon className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-medium">Aún no has publicado ningún trabajo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortfolio;