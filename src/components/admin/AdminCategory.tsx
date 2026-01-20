"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, FolderPlus, Tag, Check, X, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type Category = { id: string; name: string; };

const AdminCategory = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name", { ascending: true });
    if (error) {
      toast({ title: "Error", description: "No se pudieron cargar los datos.", variant: "destructive" });
      return;
    }
    setCategories(data || []);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("categories").insert({ name: name.trim() });
    
    if (error) {
      toast({ title: "Error", description: "Esta categoría ya existe o hubo un problema.", variant: "destructive" });
    } else {
      toast({ title: "¡Lista!", description: "Categoría añadida con éxito.", className: "bg-[#524F4A] text-white border-none" });
      setName("");
      fetchCategories();
    }
    setLoading(false);
  };

  const handleEdit = async (id: string) => {
    if (!editingName.trim()) { setEditingId(null); return; }
    const { error } = await supabase.from("categories").update({ name: editingName.trim() }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: "No se pudo actualizar.", variant: "destructive" });
    } else {
      setEditingId(null);
      fetchCategories();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("categories").delete().eq("id", deleteId);
    if (error) {
      toast({ title: "Error", description: "Asegúrate de que no tenga proyectos asociados.", variant: "destructive" });
    } else {
      toast({ title: "Eliminada", description: "La categoría ha sido borrada.", variant: "destructive" });
      fetchCategories();
    }
    setDeleteId(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* ================= FORMULARIO (4 COLS) ================= */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#DBD8D3]/50 shadow-sm sticky top-28">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#BB9E7A] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#BB9E7A]/20">
                <FolderPlus size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#524F4A]">Nueva Categoría</h3>
                <p className="text-sm text-slate-400 font-medium">Organiza tus proyectos</p>
              </div>
            </div>

            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Nombre Comercial</Label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Cocinas Modernas"
                    className="h-14 pl-12 rounded-2xl border-[#DBD8D3] bg-[#DBD8D3]/10 focus:bg-white focus:ring-[#BB9E7A] focus:border-[#BB9E7A] transition-all text-lg"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading || !name} 
                className="w-full h-14 rounded-2xl bg-[#524F4A] hover:bg-[#BB9E7A] text-white font-bold text-lg transition-all duration-300"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Registrar Categoría"}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* ================= LISTADO (7 COLS) ================= */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-xl font-bold text-[#524F4A] flex items-center gap-2 font-serif italic">
              Categorías Existentes 
              <span className="text-sm font-normal text-slate-400 ml-2 not-italic font-sans">({categories.length})</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <AnimatePresence mode="popLayout">
              {categories.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="p-20 text-center bg-[#DBD8D3]/10 rounded-[2.5rem] border border-dashed border-[#DBD8D3]"
                >
                  <AlertCircle className="mx-auto text-[#DBD8D3] mb-2" size={40} />
                  <p className="text-slate-400 font-medium tracking-wide">No hay categorías registradas aún.</p>
                </motion.div>
              ) : (
                categories.map((cat, index) => (
                  <motion.div
                    key={cat.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      editingId === cat.id 
                      ? "bg-white border-[#BB9E7A] shadow-xl shadow-[#BB9E7A]/10 ring-1 ring-[#BB9E7A]/20" 
                      : "bg-white border-[#DBD8D3]/50 hover:border-[#BB9E7A]/50 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        editingId === cat.id ? "bg-[#BB9E7A] text-white" : "bg-[#DBD8D3]/20 text-slate-400 group-hover:bg-[#BB9E7A]/10 group-hover:text-[#BB9E7A]"
                      }`}>
                        <Tag size={18} />
                      </div>
                      
                      {editingId === cat.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleEdit(cat.id)}
                            className="h-10 rounded-lg border-[#BB9E7A]/50 focus:ring-[#BB9E7A] focus:border-[#BB9E7A]"
                            autoFocus
                          />
                          <Button size="icon" onClick={() => handleEdit(cat.id)} className="bg-emerald-500 hover:bg-emerald-600 rounded-lg h-10 w-10 shrink-0">
                            <Check size={18} />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => setEditingId(null)} className="rounded-lg h-10 w-10 text-slate-400">
                            <X size={18} />
                          </Button>
                        </div>
                      ) : (
                        <span className="font-bold text-[#524F4A] tracking-tight group-hover:text-[#BB9E7A] transition-colors">{cat.name}</span>
                      )}
                    </div>

                    {!editingId && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 rounded-lg hover:bg-[#DBD8D3]/20 text-slate-500 hover:text-[#524F4A]"
                          onClick={() => { setEditingId(cat.id); setEditingName(cat.name); }}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 rounded-lg hover:bg-red-50 text-red-500"
                          onClick={() => setDeleteId(cat.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ================= DIÁLOGO DE ELIMINACIÓN ================= */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-[2.5rem] border-none p-10 shadow-2xl">
          <AlertDialogHeader>
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
              <Trash2 size={32} />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-[#524F4A]">
              ¿Confirmar eliminación?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 text-lg font-light leading-relaxed">
              Estás a punto de borrar esta categoría. Si tiene proyectos vinculados, es posible que el sistema no lo permita por seguridad estructural.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-10 gap-3">
            <AlertDialogCancel className="h-12 rounded-xl border-[#DBD8D3] font-bold text-slate-500 hover:bg-[#DBD8D3]/10">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold px-8 shadow-lg shadow-red-200"
            >
              Sí, eliminar ahora
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCategory;