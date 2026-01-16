"use client";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const WhatsAppFloat = () => {
  const [showLabel, setShowLabel] = useState(false);
  const phoneNumber = "51979923148";
  const message = "Hola Estudio Husheniid, me gustaría solicitar una cotización para un proyecto de melamina.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Aparecer la etiqueta automáticamente después de 3 segundos para llamar la atención
  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex items-center group">
      {/* Etiqueta Flotante */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute right-full mr-4 bg-white border border-slate-100 shadow-xl px-4 py-2 rounded-2xl hidden md:block"
          >
            <p className="text-slate-900 text-sm font-bold whitespace-nowrap flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ¿Hablamos por WhatsApp?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Principal */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(37,211,102,0.5)] transition-all duration-300 overflow-visible"
      >
        {/* Efecto de Onda/Radar */}
        <span className="absolute inset-0 rounded-2xl bg-[#25D366] animate-ping opacity-25 -z-10"></span>
        
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 5 }}
        >
          <MessageCircle className="w-8 h-8 fill-white/20" strokeWidth={2.5} />
        </motion.div>

        {/* Badge de "1" para simular mensaje pendiente (truco psicológico de conversión) */}
        <span className="absolute -top-1 -right-1 flex h-5 w-5">
          <span className="animate-bounce absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-100 border-2 border-white"></span>
        </span>
      </motion.a>
    </div>
  );
};

export default WhatsAppFloat;