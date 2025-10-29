import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// <-- Reemplaza con tu endpoint real de Formspree
const FORM_ENDPOINT = "https://formspree.io/f/xvgvrgbo";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "¡Mensaje enviado!",
          description: "Nos pondremos en contacto contigo pronto.",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: "Ocurrió un error al enviar el mensaje.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Variants para animaciones
  const textVariants = { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
  const infoVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
  const formVariants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };

  return (
    <section id="contacto" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Texto principal */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Contáctenos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estamos listos para hacer realidad tu proyecto
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={infoVariants}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Teléfono</h3>
                <a href="tel:+51999999999" className="text-muted-foreground hover:text-accent transition-colors">
                  +51 999 999 999
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Email</h3>
                <a href="mailto:contacto@demo.com" className="text-muted-foreground hover:text-accent transition-colors">
                  contacto@demo.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Dirección</h3>
                <p className="text-muted-foreground">
                  Av. Principal 123, Distrito
                  <br />
                  Lima, Perú
                </p>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-heading font-semibold text-foreground mb-3">Horario de Atención</h3>
              <p className="text-muted-foreground">
                Lunes a Viernes: 9:00 AM - 6:00 PM
                <br />
                Sábados: 9:00 AM - 1:00 PM
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={formVariants}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" name="name" required placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="Ingrese su número" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="tu@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-type">Tipo de proyecto</Label>
                <Select name="project-type">
                  <SelectTrigger className="bg-card border border-border">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border">
                    <SelectItem value="cocina" className="bg-card">
                      Cocina
                    </SelectItem>
                    <SelectItem value="sala" className="bg-card">
                      Sala
                    </SelectItem>
                    <SelectItem value="empotrado" className="bg-card">
                      Empotrado
                    </SelectItem>
                    <SelectItem value="oficina" className="bg-card">
                      Oficina
                    </SelectItem>
                    <SelectItem value="otro" className="bg-card">
                      Otro
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" name="message" required placeholder="Cuéntanos sobre tu proyecto..." rows={5} />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
