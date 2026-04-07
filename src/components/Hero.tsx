import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect } from "react";
// Asegúrate de que la ruta de tu imagen sea correcta
import heroImage from "@/assets/hero-kitchen.jpg";
import { getOptimizedUrl } from "@/lib/cloudinary";

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const moveX = useTransform(springX, [0, 1000], [-20, 20]);
  const moveY = useTransform(springY, [0, 1000], [-20, 20]);

  useEffect(() => {
    const isTouch = !window.matchMedia('(pointer: fine)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.2 
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.22, 1, 0.36, 1] 
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#DBD8D3]">
      {/* --- BACKGROUND LAYER --- */}
      <motion.div 
        style={{ x: moveX, y: moveY, scale: 1.05 }}
        className="absolute inset-0 w-full h-full"
      >
        <motion.img
          initial={{ scale: 1.1, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={getOptimizedUrl(heroImage, 1920)}
          alt="Cocina de melamina moderna"
          className="w-full h-full object-cover"
        />
        {/* Overlay degradado premium: De Gris Perla a Transparente */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#DBD8D3] via-[#DBD8D3]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#DBD8D3] via-transparent to-transparent opacity-70 z-10" />
      </motion.div>

      {/* Blobs Animados Constantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-[#BB9E7A]/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[15%] right-[5%] w-[500px] h-[500px] bg-[#524F4A]/5 rounded-full blur-[100px]"
        />
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
          <motion.div variants={itemVariants} style={{ x: useTransform(springX, [0, 1000], [-10, 10]) }}>
            <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter leading-[0.85] sm:leading-[0.8] text-[#524F4A] relative">
              <span className="sr-only">Muebles de Melamina en Huancayo - </span>
              estudio <br />
              <span className="relative inline-block">
                <span className="text-[#BB9E7A] italic font-serif">husheniid</span>
                {/* Brillo Constante (Shimmer) */}
                <motion.span
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
                  className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
                />
              </span>
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