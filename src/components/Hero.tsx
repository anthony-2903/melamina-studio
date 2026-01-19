import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
// Asegúrate de que la ruta de tu imagen sea correcta
import heroImage from "@/assets/hero-kitchen.jpg";

const Hero = () => {
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
        ease: [0.22, 1, 0.36, 1] 
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#DBD8D3]">
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 w-full h-full">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src={heroImage}
          alt="Cocina de melamina moderna"
          className="w-full h-full object-cover"
        />
        {/* Overlay degradado premium: De Gris Perla a Transparente */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#DBD8D3] via-[#DBD8D3]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#DBD8D3] via-transparent to-transparent opacity-80" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="container mx-auto px-6 z-10">
        <motion.div
          className="max-w-5xl space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge Superior en Dorado Arena */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-[#BB9E7A]"></span>
            <span className="text-[#BB9E7A] font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs">
              Mobiliario de Autor & Alta Gama
            </span>
          </motion.div>

          {/* Título Principal: Mezcla de Sans y Serif */}
          <motion.div variants={itemVariants}>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter leading-[0.8] text-[#524F4A]">
              estudio <br />
              <span className="text-[#BB9E7A] italic font-serif">husheniid</span>
            </h1>
          </motion.div>

          {/* Descripción con acento lateral en Gris Carbón */}
          <motion.div variants={itemVariants} className="max-w-xl">
            <p className="text-lg md:text-xl text-[#524F4A]/80 leading-relaxed border-l border-[#BB9E7A] pl-8 font-light italic">
              Transformamos la melamina en piezas de colección. Especialistas en diseño de interiores y acabados de alta gama en Huancayo.
            </p>
          </motion.div>

          {/* Botones de Acción: Bicolor Premium */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 pt-4"
          >
            <Button 
              asChild
              size="lg" 
              className="bg-[#524F4A] hover:bg-[#BB9E7A] text-white rounded-full px-10 py-8 text-lg shadow-2xl shadow-[#524F4A]/20 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <a href="#portafolio" className="flex items-center gap-3">
                Explorar Proyectos <ArrowRight size={20} />
              </a>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-[#524F4A]/20 text-[#524F4A] hover:bg-[#524F4A] hover:text-white bg-white/20 backdrop-blur-md rounded-full px-10 py-8 text-lg transition-all duration-500"
            >
              <a href="#contacto">Solicitar Cita</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* --- DECORATIVE ELEMENTS --- */}
      
      {/* Indicador de Scroll Minimalista */}
      <motion.div
        className="absolute bottom-10 left-10 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center gap-2">
           <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#BB9E7A]"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
        <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#524F4A]/40 rotate-180 [writing-mode:vertical-lr]">
          Descubre más
        </span>
      </motion.div>

      {/* Marca de agua lateral con el año actual */}
      <div className="absolute hidden xl:block right-[-8%] top-1/2 -translate-y-1/2 rotate-90">
        <p className="text-[12rem] font-bold text-[#524F4A]/[0.02] select-none whitespace-nowrap font-serif">
          HUSHENIID — 2026
        </p>
      </div>
    </section>
  );
};

export default Hero;