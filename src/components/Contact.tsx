"use client";

import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  ArrowUpRight, 
  Music2Icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

const Contact = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="contacto" className="py-32 bg-[#DBD8D3]/20 relative overflow-hidden">
      {/* Elementos de Diseño de Fondo con nueva paleta */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#BB9E7A]/10 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#524F4A]/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="text-[#BB9E7A] font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
            Contacto Exclusivo
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-6xl md:text-8xl font-bold tracking-tighter text-[#524F4A] mb-8 leading-[0.9]">
            ¿Listo para elevar tu <span className="text-[#BB9E7A] italic font-serif">espacio?</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-slate-500 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Eliminamos las barreras. Comunicación directa para proyectos extraordinarios de melamina en Huancayo.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* TARJETA PRINCIPAL: WHATSAPP (ESTILO PREMIUM GRIS CARBÓN) */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-1 group relative p-10 bg-[#524F4A] rounded-[3rem] text-white flex flex-col justify-between overflow-hidden shadow-2xl shadow-[#524F4A]/20 h-[450px]"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#BB9E7A] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[#BB9E7A]/20">
                <MessageCircle size={32} className="text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-4">WhatsApp <br/> Concierge</h3>
              <p className="text-[#DBD8D3]/70 text-lg leading-relaxed font-light">
                Asesoría inmediata y presupuestos por chat. Envíanos fotos de tu espacio hoy mismo.
              </p>
            </div>
            
            <Button asChild className="relative z-10 w-full h-16 rounded-2xl bg-white text-[#524F4A] hover:bg-[#BB9E7A] hover:text-white font-bold text-lg transition-all duration-500 group">
              <a href="https://wa.me/51979923148" target="_blank" className="flex items-center justify-between px-6">
                Chatear Ahora
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </Button>

            <MessageCircle className="absolute -right-16 -bottom-16 text-white/[0.03] w-80 h-80 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
          </motion.div>

          {/* COLUMNA 2: INFO DE CONTACTO */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { icon: Phone, label: "Llamada Directa", val: "+51 979 923 148", href: "tel:+51979923148" },
              { icon: Mail, label: "Correo Oficial", val: "husheniid@gmail.com", href: "mailto:husheniid@gmail.com" },
            ].map((info, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-[#DBD8D3]/50 shadow-sm hover:shadow-xl hover:border-[#BB9E7A]/30 transition-all duration-500 group flex flex-col justify-between h-[213px]">
                <div className="w-12 h-12 rounded-xl bg-[#DBD8D3]/20 flex items-center justify-center text-[#524F4A] group-hover:text-white group-hover:bg-[#BB9E7A] transition-all">
                  <info.icon size={22} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-[#BB9E7A] uppercase tracking-[0.2em] mb-2">{info.label}</h4>
                  <a href={info.href} className="text-2xl font-bold text-[#524F4A] tracking-tighter hover:text-[#BB9E7A] transition-colors">
                    {info.val}
                  </a>
                </div>
              </div>
            ))}
          </motion.div>

          {/* COLUMNA 3: UBICACIÓN Y SOCIAL */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white p-8 rounded-[2.5rem] border border-[#DBD8D3]/50 shadow-sm h-[213px] flex flex-col justify-between overflow-hidden relative group">
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#DBD8D3]/20 flex items-center justify-center text-[#524F4A]">
                  <MapPin size={22} />
                </div>
               <div className="flex gap-3">
  {/* Instagram */}
  <a 
    href="https://www.instagram.com/hugocaldeton/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-3 bg-[#DBD8D3]/20 rounded-xl hover:bg-[#BB9E7A] hover:text-white transition-all text-[#524F4A]"
    title="Síguenos en Instagram"
  >
    <Instagram size={18} />
  </a>

  {/* Facebook */}
  <a 
    href="https://www.facebook.com/profile.php?id=61551909329314#" 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-3 bg-[#DBD8D3]/20 rounded-xl hover:bg-[#BB9E7A] hover:text-white transition-all text-[#524F4A]"
    title="Síguenos en Facebook"
  >
    <Facebook size={18} />
  </a>

  {/* TikTok */}
  <a 
    href="https://www.tiktok.com/@husheniid" 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-3 bg-[#DBD8D3]/20 rounded-xl hover:bg-[#BB9E7A] hover:text-white transition-all text-[#524F4A]"
    title="Síguenos en TikTok"
  >
    <Music2Icon size={18} />
  </a>
</div>
              </div>
              <div className="relative z-10">
                <h4 className="text-[10px] font-bold text-[#BB9E7A] uppercase tracking-[0.2em] mb-2">Estudio Físico</h4>
                <p className="text-lg font-bold text-[#524F4A] leading-tight">
                  AV Coronel Parra, Cruce de Pilcomayo, Huancayo
                </p>
              </div>
              <MapPin className="absolute -right-8 -top-8 text-[#524F4A]/[0.02] w-40 h-40 group-hover:scale-110 transition-transform duration-700" />
            </div>

            {/* HORARIO (EN DORADO ARENA) */}
            <div className="bg-[#BB9E7A] p-8 rounded-[2.5rem] text-white h-[213px] flex flex-col justify-between shadow-lg shadow-[#BB9E7A]/20">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Clock size={22} />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] mb-2">Horario de Atención</h4>
                <p className="text-lg font-bold leading-tight">
                  Lun - Vie: 9am — 6pm <br/>
                  Sábados: 9am — 1pm
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Footer de Sección */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-[#DBD8D3] flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-slate-400 font-medium">© {new Date().getFullYear()} Estudio Husheniid — Todos los derechos reservados.</p>
          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-[#524F4A]">
            <a href="#" className="hover:text-[#BB9E7A] transition-colors">Portafolio</a>
            <a href="#" className="hover:text-[#BB9E7A] transition-colors">Servicios</a>
            <a href="#" className="hover:text-[#BB9E7A] transition-colors">Privacidad</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;