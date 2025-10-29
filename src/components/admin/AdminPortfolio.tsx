import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AdminPortfolio = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;

    console.log("Nombre proyecto:", name);
    console.log("Tipo:", type);
    console.log("Descripción:", description);
    console.log("Imagen:", imageFile);

    // Aquí podrías agregar la lógica para subir los datos a Supabase o tu API

    setTimeout(() => {
      toast({ title: "Portafolio agregado" });
      form.reset();
      setImageFile(null);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Agregar Portafolio</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-card p-6 rounded-lg shadow"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del proyecto</Label>
            <Input id="name" name="name" required placeholder="Nombre del proyecto" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de proyecto</Label>
            <Input id="type" name="type" required placeholder="Cocina, Sala, Empotrado..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" name="description" required placeholder="Descripción del proyecto..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Imagen del proyecto</Label>
            <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Agregar Portafolio"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AdminPortfolio;
