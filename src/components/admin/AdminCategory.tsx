"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2 } from "lucide-react";

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

type Category = {
  id: string;
  name: string;
};

const AdminCategory = () => {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ========================
  // FETCH
  // ========================
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "❌ Error",
        description: "No se pudieron cargar las categorías",
      });
      return;
    }

    setCategories(data || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ========================
  // CREATE
  // ========================
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "⚠️ Campo requerido",
        description: "El nombre es obligatorio",
      });
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
      toast({
        title: "✅ Categoría creada",
        description: "Se agregó correctamente",
        className: "bg-green-100 text-green-900",
      });
      setName("");
      fetchCategories();
    }

    setLoading(false);
  };

  // ========================
  // EDIT
  // ========================
  const handleEdit = async (id: string) => {
    if (!editingName.trim()) return;

    const { error } = await supabase
      .from("categories")
      .update({ name: editingName.trim() })
      .eq("id", id);

    if (error) {
      toast({
        title: "❌ Error",
        description: "No se pudo editar",
      });
    } else {
      toast({
        title: "✏️ Categoría editada",
        description: "Cambios guardados",
        className: "bg-blue-100 text-blue-900",
      });
      setEditingId(null);
      setEditingName("");
      fetchCategories();
    }
  };

  // ========================
  // DELETE
  // ========================
  const handleDelete = async () => {
    if (!deleteId) return;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", deleteId);

    if (error) {
      toast({
        title: "❌ Error",
        description: "No se pudo eliminar",
      });
    } else {
      toast({
        title: "🗑️ Categoría eliminada",
        description: "Eliminada correctamente",
        className: "bg-red-100 text-red-900",
      });
      fetchCategories();
    }

    setDeleteId(null);
  };

  return (
    <section className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ================= FORM ================= */}
        <form
          onSubmit={handleCreate}
          className="space-y-4 bg-card p-6 rounded-lg shadow"
        >
          <h3 className="text-lg font-bold">Crear Categoría</h3>

          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Muebles"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Categoría"}
          </Button>
        </form>

        {/* ================= LIST ================= */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Categorías</h3>

          {categories.length === 0 ? (
            <p className="text-muted-foreground">
              No hay categorías aún
            </p>
          ) : (
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="flex items-center justify-between p-3 border rounded bg-background"
                >
                  {editingId === cat.id ? (
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onBlur={() => handleEdit(cat.id)}
                      autoFocus
                    />
                  ) : (
                    <span className="font-medium">{cat.name}</span>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(cat.id);
                        setEditingName(cat.name);
                      }}
                    >
                      <Pencil className="w-4 h-4 text-blue-500" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setDeleteId(cat.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ================= MODAL DELETE ================= */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              ¿Eliminar categoría?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default AdminCategory;
