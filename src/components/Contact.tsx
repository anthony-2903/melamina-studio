"use client";

import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  ArrowUpRight 
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
    <section id="contacto" className="py-32 bg-[#fafafa] relative overflow-hidden">
      {/* Elementos de Diseño de Fondo */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-200/50 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="text-orange-600 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
            Contacto Exclusivo
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-950 mb-8 leading-[0.9]">
            ¿Listo para elevar tu <span className="text-orange-600 italic">espacio?</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-slate-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Eliminamos las barreras. Sin formularios largos, solo comunicación directa para proyectos extraordinarios.
          </motion.p>
        </motion.div>

        {/* Layout Principal sin Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* TARJETA PRINCIPAL: WHATSAPP (DESTACADA) */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-1 group relative p-10 bg-slate-950 rounded-[3rem] text-white flex flex-col justify-between overflow-hidden shadow-2xl shadow-slate-950/20 h-[450px]"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-500/20">
                <MessageCircle size={32} fill="white" />
              </div>
              <h3 className="text-4xl font-bold mb-4">WhatsApp <br/> Concierge</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Asesoría inmediata y presupuestos por chat. Envíanos fotos de tu espacio ahora mismo.
              </p>
            </div>
            
            <Button asChild className="relative z-10 w-full h-16 rounded-2xl bg-white text-slate-950 hover:bg-orange-500 hover:text-white font-bold text-lg transition-all duration-500 group">
              <a href="https://wa.me/51979923148" target="_blank" className="flex items-center justify-between px-6">
                Chatear Ahora
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </Button>

            {/* Decoración de fondo de la tarjeta */}
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
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-500 group flex flex-col justify-between h-[213px]">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-orange-600 group-hover:bg-orange-50 transition-colors">
                  <info.icon size={22} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{info.label}</h4>
                  <a href={info.href} className="text-2xl font-bold text-slate-900 tracking-tighter hover:text-orange-600 transition-colors">
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
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-[213px] flex flex-col justify-between overflow-hidden relative group">
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <MapPin size={22} />
                </div>
                <div className="flex gap-2">
                   <a href="#" className="p-3 bg-slate-50 rounded-xl hover:bg-orange-500 hover:text-white transition-all text-slate-400"><Instagram size={18} /></a>
                   <a href="#" className="p-3 bg-slate-50 rounded-xl hover:bg-orange-500 hover:text-white transition-all text-slate-400"><Facebook size={18} /></a>
                </div>
              </div>
              <div className="relative z-10">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Estudio Físico</h4>
                <p className="text-lg font-bold text-slate-900 leading-tight">
                  AV Coronel Parra, Cruce de Pilcomayo, Huancayo
                </p>
              </div>
              <MapPin className="absolute -right-8 -top-8 text-slate-100/50 w-40 h-40 group-hover:scale-110 transition-transform duration-700" />
            </div>

            <div className="bg-orange-600 p-8 rounded-[2.5rem] text-white h-[213px] flex flex-col justify-between">
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
          className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-slate-400 font-medium">© {new Date().getFullYear()} Estudio Husheniid — Todos los derechos reservados.</p>
          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-900">
            <a href="#" className="hover:text-orange-600 transition-colors">Portafolio</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Servicios</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Privacidad</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;