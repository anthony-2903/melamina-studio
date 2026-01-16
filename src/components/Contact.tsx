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
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, Variants } from "framer-motion";

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
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        toast({ title: "¡Mensaje enviado!", description: "Nos pondremos en contacto contigo pronto." });
        form.reset();
      } else {
        toast({ title: "Error", description: "Ocurrió un error al enviar el mensaje.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "No se pudo conectar con el servidor.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="contacto" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="text-orange-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
            Hablemos de tu idea
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-950">
            Inicia tu <span className="text-orange-600 italic">Proyecto</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* INFO SIDE */}
          <motion.div
            className="lg:col-span-5 space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { icon: Phone, label: "Teléfono", val: "+51 979 923 148", href: "tel:+51979923148" },
              { icon: Mail, label: "Email", val: "husheniid@gmail.com", href: "husheniid@gmail.com" },
              { icon: MapPin, label: "Dirección", val: "AV Coronel Parra, Cruce de Pilcomayo, Huancayo", href: "#" },
              { icon: Clock, label: "Horario", val: "Lun - Vie: 9am - 6pm | Sáb: 9am - 1pm", href: null },
            ].map((info, i) => (
              <motion.div key={i} variants={itemVariants} className="flex gap-6 group">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-orange-600 group-hover:bg-orange-50 group-hover:border-orange-100 transition-all duration-500">
                  <info.icon size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{info.label}</h4>
                  {info.href ? (
                    <a href={info.href} className="text-xl font-bold text-slate-900 hover:text-orange-600 transition-colors">
                      {info.val}
                    </a>
                  ) : (
                    <p className="text-xl font-bold text-slate-900">{info.val}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="p-8 bg-slate-950 rounded-[2.5rem] text-white relative overflow-hidden group">
               <div className="relative z-10">
                 <h4 className="text-2xl font-bold mb-2 text-balance text-orange-400">¿Prefieres una respuesta inmediata?</h4>
                 <p className="text-slate-400 mb-6">Chatea con nosotros directamente por WhatsApp.</p>
                 <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-6 h-auto transition-all hover:scale-105">
                   <a href="https://wa.me/51979923148" target="_blank" className="flex items-center gap-2 text-lg">
                     <MessageCircle size={20} fill="white" />
                     WhatsApp Directo
                   </a>
                 </Button>
               </div>
               <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                 <MessageCircle size={200} />
               </div>
            </motion.div>
          </motion.div>

          {/* FORM SIDE */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit} className="bg-white p-10 md:p-14 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Nombre Completo</Label>
                  <Input id="name" name="name" required placeholder="Ej. Juan Pérez" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-orange-600 transition-all" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">WhatsApp / Teléfono</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="+51 000 000 000" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-orange-600 transition-all" />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Correo Electrónico</Label>
                <Input id="email" name="email" type="email" required placeholder="husheniid@gmail.com" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-orange-600 transition-all" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="project-type" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">¿Qué proyecto tienes en mente?</Label>
                <Select name="project-type">
                  <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:ring-orange-600 transition-all">
                    <SelectValue placeholder="Selecciona el área" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-100">
                    {["Cocina Moderna", "Sala de Estar", "Mueble Empotrado", "Oficina / Estudio", "Otro"].map(type => (
                      <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Detalles del Proyecto</Label>
                <Textarea id="message" name="message" required placeholder="Describe brevemente lo que necesitas (medidas aproximadas, colores, etc.)" className="min-h-[150px] rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-orange-600 transition-all" />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold shadow-xl shadow-orange-600/20 transition-all hover:scale-[1.02] active:scale-95">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">Enviando solicitud...</span>
                ) : (
                  <span className="flex items-center gap-2 uppercase tracking-widest">
                    Enviar Mensaje <Send size={18} />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;