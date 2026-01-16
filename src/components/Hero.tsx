import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
// Asegúrate de que la ruta de tu imagen sea correcta
import heroImage from "@/assets/hero-kitchen.jpg";

const Hero = () => {
  // Tipado explícito para evitar errores de TS
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.3 
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 w-full h-full">
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "linear" }}
          src={heroImage}
          alt="Cocina de melamina moderna"
          className="w-full h-full object-cover"
        />
        {/* Overlay degradado para legibilidad (Blanco a Transparente) */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="container mx-auto px-6 z-10">
        <motion.div
          className="max-w-4xl space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge Superior */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="h-[2px] w-10 bg-orange-600"></span>
            <span className="text-orange-600 font-bold tracking-[0.3em] uppercase text-xs md:text-sm">
              Diseño & Fabricación Premium
            </span>
          </motion.div>

          {/* Título Principal */}
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.8] text-slate-950">
              estudio <br />
              <span className="text-orange-600 italic">husheniid</span>
            </h1>
          </motion.div>

          {/* Descripción con acento lateral */}
          <motion.div variants={itemVariants} className="max-w-xl">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed border-l-4 border-orange-600 pl-6 italic">
              Transformamos tus ideas en espacios funcionales de melamina. 
              Especialistas en cocinas, salas y acabados de alta gama en Huancayo.
            </p>
          </motion.div>

          {/* Botones de Acción */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button 
              asChild
              size="lg" 
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 py-7 text-lg shadow-xl shadow-orange-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <a href="#portafolio" className="flex items-center gap-2">
                Ver Portafolio <ArrowRight size={20} />
              </a>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-white rounded-full px-8 py-7 text-lg transition-all"
            >
              <a href="#contacto">Cotizar Ahora</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* --- DECORATIVE & INTERACTIVE ELEMENTS --- */}
      
      {/* Indicador de Scroll Vertical */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 [writing-mode:vertical-lr] mb-2">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-orange-600"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>

      {/* Marca de agua lateral (Opcional - Estilo Editorial) */}
      <div className="absolute hidden xl:block right-[-5%] top-1/2 -translate-y-1/2 rotate-90">
        <p className="text-[10rem] font-bold text-slate-950/[0.03] select-none whitespace-nowrap">
          MELAMINA DE AUTOR — 2026
        </p>
      </div>
    </section>
  );
};

export default Hero;