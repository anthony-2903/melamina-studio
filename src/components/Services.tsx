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

// Variantes con corrección de tipos para TypeScript
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
    <section id="servicios" className="py-24 bg-white relative overflow-hidden">
      {/* Decoración de fondo muy sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

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
            className="text-orange-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Nuestra Expertise
          </motion.span>
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-slate-950 tracking-tighter mb-6"
            variants={itemVariants}
          >
            Soluciones en <span className="text-orange-600 italic">Melamina</span>
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="w-20 h-1.5 bg-orange-600 mx-auto rounded-full" 
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
          {services.map((service, index) => (
            <motion.div 
              key={service.title} 
              variants={itemVariants}
              whileHover={{ 
                y: -12,
                transition: { type: "spring", stiffness: 300, damping: 20 } 
              }}
              // El movimiento de salida será fluido gracias a la transición base en itemVariants
              className="group relative"
            >
              {/* Fondo decorativo de la tarjeta al hacer hover */}
              <div className="absolute inset-0 bg-orange-600 rounded-[2.5rem] translate-y-2 translate-x-1 opacity-0 group-hover:opacity-10 transition-all duration-500 blur-xl" />
              
              <div className="relative h-full p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm transition-all duration-500 group-hover:border-orange-200 group-hover:shadow-2xl group-hover:shadow-orange-600/5">
                
                {/* Icono con animación circular */}
                <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-orange-100 rounded-2xl rotate-6 group-hover:rotate-12 group-hover:bg-orange-600 transition-all duration-500" />
                  <service.icon className="relative z-10 w-8 h-8 text-orange-600 group-hover:text-white transition-colors duration-500" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                  {service.description}
                </p>

                {/* Detalle decorativo inferior */}
                <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0">
                  <div className="h-[2px] w-8 bg-orange-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">Servicio Elite</span>
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