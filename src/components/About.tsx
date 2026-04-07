import { Award, Users, Target, Heart } from "lucide-react";
import workshopImage from "@/assets/about-workshop.jpg";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { getOptimizedUrl } from "@/lib/cloudinary";
import { useRef } from "react";

const values = [
  {
    icon: Award,
    title: "Calidad Superior",
    description: "Materiales de gama alta con certificaciones de durabilidad.",
    color: "bg-[#DBD8D3]/30", // Fondo gris perla suave
    iconColor: "text-[#BB9E7A]", // Dorado Arena
  },
  {
    icon: Users,
    title: "Equipo Experto",
    description: "Maestros carpinteros con pasión por el detalle.",
    color: "bg-white",
    iconColor: "text-[#524F4A]", // Gris Carbón
  },
  {
    icon: Target,
    title: "Precisión Láser",
    description: "Medidas milimétricas para encajes perfectos en tu hogar.",
    color: "bg-white",
    iconColor: "text-[#524F4A]",
  },
  {
    icon: Heart,
    title: "Garantía Total",
    description: "Acompañamiento post-venta para tu tranquilidad.",
    color: "bg-[#DBD8D3]/30",
    iconColor: "text-[#BB9E7A]",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section 
      id="conocenos" 
      ref={containerRef}
      className="py-16 md:py-24 bg-[#DBD8D3]/10 overflow-hidden relative"
    >
      {/* Elementos Decorativos de Fondo: Blobs Animados */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-[#BB9E7A]/5 rounded-full blur-[120px] -z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-20 right-[-5%] w-[400px] h-[400px] bg-[#524F4A]/5 rounded-full blur-[100px] -z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* LADO IZQUIERDO: TEXTO EDITORIAL */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-6 md:space-y-8"
          >
            <motion.div variants={itemVariants}>
              <span className="text-[#BB9E7A] font-bold tracking-[0.4em] uppercase text-xs block mb-4">
                Desde el Taller
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-[#524F4A] leading-tight">
                { "Pasión por la".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={itemVariants}
                    className="inline-block mr-4"
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                <motion.span 
                  variants={itemVariants}
                  className="text-[#BB9E7A] italic font-serif inline-block"
                >
                  Melamina
                </motion.span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-xl text-[#524F4A] font-medium leading-relaxed">
                En{" "}
                <span className="font-bold border-b-2 border-[#BB9E7A]">
                  Estudio Husheniid
                </span>
                , diseñamos experiencias que transforman tu forma de vivir.
              </p>
              <p className="text-slate-500 leading-relaxed font-light">
                Con más de 10 años de experiencia y garantía en nuestros
                trabajos, contamos con local físico en Huancayo, Pilcomayo Av.
                Coronel Parra (cruce de Pilcomayo), donde podrá ver físicamente la
                calidad y diseño de nuestros muebles. Realizamos el diseño de
                interiores con wallpaper, PVC, decoraciones novedosas para tu
                hogar y negocio. Ofrecemos: Diseños en 3D para tus
                muebles, empotrados de cocina, clóset (walk-in closet), centro de
                entretenimiento, stands, escritorios, repisas flotantes y muebles
                para todo tipo de negocio.
              </p>
            </motion.div>

            {/* Grid de Valores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    rotateX: 5,
                    rotateY: 5,
                  }}
                  className={`${value.color} p-6 rounded-[2rem] transition-all duration-500 border border-slate-100 hover:border-[#BB9E7A]/30 hover:shadow-2xl hover:shadow-[#BB9E7A]/15 perspective-1000`}
                >
                  <value.icon className={`${value.iconColor} w-6 h-6 mb-4`} />
                  <h3 className="font-bold text-[#524F4A] mb-1">
                    {value.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-snug">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* LADO DERECHO: IMAGEN COMPUESTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative"
          >
            {/* Decoración: Glow en color Dorado Arena */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#BB9E7A]/20 rounded-full blur-[100px] -z-10"></div>

            <div className="relative group">
              <div className="absolute -inset-4 border border-[#DBD8D3] rounded-[3rem] -z-10 group-hover:border-[#BB9E7A]/50 transition-colors duration-700"></div>

              <motion.div 
                style={{ y: y1, rotate }}
                className="overflow-hidden rounded-[2.8rem] shadow-2xl relative border-4 border-white"
              >
                <img
                  src={getOptimizedUrl(workshopImage, 1000)}
                  alt="Nuestro taller de carpintería"
                  className="w-full object-cover aspect-[4/5] lg:aspect-[3/4] transition-transform duration-[2s] group-hover:scale-105"
                />

                {/* Overlay flotante informativo con estética Glassmorphism */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-4 sm:bottom-8 left-4 right-4 sm:left-8 sm:right-8 bg-white/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/40 shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#524F4A] font-bold text-2xl sm:text-3xl">
                        +10 Años
                      </p>
                      <p className="text-[#BB9E7A] text-[8px] sm:text-[10px] tracking-[0.2em] uppercase font-bold">
                        Experiencia Real
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#524F4A] rounded-xl sm:rounded-2xl flex items-center justify-center text-[#BB9E7A] shadow-lg">
                      <Users size={20} className="sm:w-7 sm:h-7" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Ubicación Flotante en Gris Carbón */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -left-6 hidden xl:block p-6 bg-[#524F4A] text-[#DBD8D3] rounded-[2rem] shadow-2xl border border-white/10"
              >
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-1">
                  Ubicación
                </p>
                <p className="font-semibold text-white">Huancayo, Perú</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
