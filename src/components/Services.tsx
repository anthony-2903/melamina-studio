import { Ruler, Hammer, Truck, Wrench, Palette, Shield } from "lucide-react";
import { motion, Variants } from "framer-motion";

const services = [
  {
    icon: Ruler,
    title: "Diseño Personalizado",
    description: "Creamos renders 3D únicos adaptados a tus espacios y necesidades específicas.",
  },
  {
    icon: Hammer,
    title: "Fabricación de Calidad",
    description: "Utilizamos melamina de primera calidad con acabados profesionales y duraderos.",
  },
  {
    icon: Truck,
    title: "Instalación Profesional",
    description: "Nuestro equipo realiza la instalación completa con limpieza y precisión total.",
  },
  {
    icon: Wrench,
    title: "Visita Técnica",
    description: "Acudimos a tu domicilio para tomar medidas exactas sin costo adicional.",
  },
  {
    icon: Palette,
    title: "Variedad de Acabados",
    description: "Amplia gama de colores y texturas (Vesto, Pelíkan) para tu decoración.",
  },
  {
    icon: Shield,
    title: "Garantía Husheniid",
    description: "Respaldamos cada proyecto con garantía estructural y de herrajes.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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
    } 
  },
};

const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-[#DBD8D3]/10 relative overflow-hidden">
      {/* Patrón de fondo premium (puntos sutiles en Gris Perla) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#DBD8D3_1.5px,transparent_1.5px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Título Editorial */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span 
            variants={itemVariants}
            className="text-[#BB9E7A] font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block"
          >
            Nuestra Expertise
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-[#524F4A] tracking-tighter mb-6"
            variants={itemVariants}
          >
            Soluciones en <span className="text-[#BB9E7A] italic font-serif">Melamina</span>
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="w-16 h-[2px] bg-[#BB9E7A] mx-auto" 
          />
        </motion.div>

        {/* Grid de servicios */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.title} 
              variants={itemVariants}
              whileHover={{ 
                y: -12,
                transition: { type: "spring", stiffness: 300, damping: 20 } 
              }}
              className="group relative"
            >
              {/* Sombra de fondo al hacer hover en Dorado Arena muy suave */}
              <div className="absolute inset-0 bg-[#BB9E7A] rounded-[2.5rem] translate-y-2 translate-x-1 opacity-0 group-hover:opacity-5 transition-all duration-500 blur-xl" />
              
              <div className="relative h-full p-10 bg-white border border-[#DBD8D3]/50 rounded-[2.5rem] shadow-sm transition-all duration-500 group-hover:border-[#BB9E7A]/30 group-hover:shadow-xl group-hover:shadow-[#524F4A]/5">
                
                {/* Icono con animación en Dorado Arena */}
                <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#DBD8D3]/30 rounded-2xl rotate-6 group-hover:rotate-12 group-hover:bg-[#BB9E7A] transition-all duration-500" />
                  <service.icon className="relative z-10 w-7 h-7 text-[#BB9E7A] group-hover:text-white transition-colors duration-500" />
                </div>

                <h3 className="text-2xl font-bold text-[#524F4A] mb-4 group-hover:text-[#BB9E7A] transition-colors tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors font-light">
                  {service.description}
                </p>

                {/* Detalle decorativo inferior */}
                <div className="mt-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0">
                  <div className="h-[1px] w-8 bg-[#BB9E7A]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#BB9E7A]">Servicio Exclusive</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;