"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Pencil, Trash2, Plus, Upload, Image as ImageIcon, 
  Loader2, X, Sparkles, Save 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Category = { id: string; name: string; };
type Portfolio = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category_id?: string;
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
  
  // Estados para Edición
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
    const { data } = await supabase.from("portfolios").select(`id, title, description, image_url, category_id, categories ( name )`).order("created_at", { ascending: false });
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
      toast({ title: "Imagen requerida", description: "Por favor sube una foto.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("name") as string;
    const description = formData.get("description") as string;

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: data });
      const file = await res.json();
      
      const { error } = await supabase.from("portfolios").insert({
        title, description, image_url: file.secure_url, category_id: selectedCategory,
      });

      if (error) throw error;
      toast({ title: "¡Publicado!", className: "bg-[#524F4A] text-white" });
      formRef.current?.reset();
      setImageFile(null);
      setImagePreview(null);
      fetchPortfolios();
    } catch (err) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const updates = {
      title: formData.get("edit-name"),
      description: formData.get("edit-description"),
      category_id: formData.get("edit-category"),
    };

    const { error } = await supabase.from("portfolios").update(updates).eq("id", editingItem.id);

    if (!error) {
      toast({ title: "Cambios guardados", className: "bg-[#BB9E7A] text-white" });
      setIsEditDialogOpen(false);
      fetchPortfolios();
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este proyecto?")) return;
    await supabase.from("portfolios").delete().eq("id", id);
    toast({ title: "Eliminado", variant: "destructive" });
    fetchPortfolios();
  };

  if (!mounted) return null;

  return (
    <div className="space-y-12 pb-20">
      
      {/* FORMULARIO DE CREACIÓN (Mismo que antes) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2.5rem] border border-[#DBD8D3]/50 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-[#DBD8D3]/30 bg-[#DBD8D3]/5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#524F4A] font-serif italic"> Proyecto</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Nuevo contenido visual</p>
          </div>
          <div className="h-12 w-12 bg-[#BB9E7A] rounded-2xl flex items-center justify-center text-white">
            <Plus size={24} />
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#524F4A]/60 ml-1">Título</Label>
              <Input name="name" className="h-14 rounded-2xl border-[#DBD8D3] bg-[#DBD8D3]/10 focus:ring-[#BB9E7A]" required />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#524F4A]/60 ml-1">Categoría</Label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full h-14 border border-[#DBD8D3] rounded-2xl px-5 bg-[#DBD8D3]/10">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#524F4A]/60 ml-1">Descripción</Label>
              <Textarea name="description" rows={4} className="rounded-2xl border-[#DBD8D3] bg-[#DBD8D3]/10" />
            </div>
            <Button disabled={isSubmitting} className="w-full h-14 rounded-2xl bg-[#524F4A] hover:bg-[#BB9E7A] text-white font-bold transition-all duration-500">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Publicar Obra"}
            </Button>
          </div>

          <div className="relative group border-2 border-dashed rounded-[2.5rem] flex items-center justify-center min-h-[350px] overflow-hidden border-[#DBD8D3] bg-[#DBD8D3]/5">
            {imagePreview ? (
              <>
                <img src={imagePreview} className="w-full h-full absolute inset-0 object-cover" />
                <div className="absolute inset-0 bg-[#524F4A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <Button type="button" variant="destructive" onClick={() => {setImagePreview(null); setImageFile(null);}} className="rounded-full">
                    <X size={16} className="mr-2" /> Descartar
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center p-12">
                <Upload size={32} className="mx-auto mb-4 text-[#DBD8D3]" />
                <p className="text-sm font-bold text-[#524F4A]">Seleccionar imagen</p>
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            )}
          </div>
        </form>
      </motion.div>

      {/* GRID DE TRABAJOS */}
      <div className="space-y-8">
        <div className="flex items-end justify-between px-4">
          <h2 className="text-3xl font-bold text-[#524F4A] tracking-tighter flex items-center gap-3">Catálogo <Sparkles className="text-[#BB9E7A]" size={20} /></h2>
          <span className="px-6 py-2 bg-[#524F4A] text-white rounded-full text-[10px] font-bold uppercase tracking-widest">{portfolios.length} Proyectos</span>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((p) => (
            <div key={p.id} className="group bg-white rounded-[2.5rem] border border-[#DBD8D3]/40 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={p.image_url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#524F4A]/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-all duration-500" />
                
                <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-[10px] text-[#BB9E7A] font-bold uppercase tracking-widest mb-2">{p.categories?.[0]?.name || "Concepto"}</p>
                  <h3 className="font-serif italic text-2xl text-white mb-6 leading-tight">{p.title}</h3>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <Button 
                      onClick={() => { setEditingItem(p); setIsEditDialogOpen(true); }}
                      className="flex-1 rounded-xl bg-white text-[#524F4A] hover:bg-[#BB9E7A] hover:text-white border-none h-11 font-bold text-xs uppercase tracking-widest"
                    >
                      <Pencil size={16} className="mr-2" /> Editar
                    </Button>
                    <Button 
                      onClick={() => handleDelete(p.id)}
                      className="rounded-xl bg-white/10 backdrop-blur-md text-white hover:bg-red-500 border border-white/20 h-11 w-11 p-0"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE EDICIÓN */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-[#DBD8D3] bg-white p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="p-8 bg-[#524F4A] text-white">
            <DialogTitle className="text-2xl font-serif italic flex items-center gap-2">
              <Pencil size={20} className="text-[#BB9E7A]" /> Editar Obra
            </DialogTitle>
            <DialogDescription className="text-[#DBD8D3]/70 uppercase text-[10px] tracking-widest font-bold">
              Modifica los detalles del proyecto seleccionado
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="p-8 space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-[#524F4A]/60 ml-1">Nuevo Título</Label>
              <Input name="edit-name" defaultValue={editingItem?.title} className="h-12 rounded-xl border-[#DBD8D3] focus:ring-[#BB9E7A]" required />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-[#524F4A]/60 ml-1">Categoría</Label>
              <select name="edit-category" defaultValue={editingItem?.category_id} className="w-full h-12 border border-[#DBD8D3] rounded-xl px-4 bg-[#DBD8D3]/5">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-[#524F4A]/60 ml-1">Descripción</Label>
              <Textarea name="edit-description" defaultValue={editingItem?.description} rows={4} className="rounded-xl border-[#DBD8D3] bg-[#DBD8D3]/5 resize-none" />
            </div>

            <DialogFooter className="pt-4 flex gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsEditDialogOpen(false)} className="rounded-xl font-bold text-xs uppercase tracking-widest text-slate-400">
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="rounded-xl bg-[#BB9E7A] hover:bg-[#524F4A] text-white px-8 font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#BB9E7A]/20">
                {isSubmitting ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-2" />}
                Guardar Cambios
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminPortfolio;