import { Award, Users, Target, Heart } from "lucide-react";
import workshopImage from "@/assets/about-workshop.jpg";
import { motion, Variants } from "framer-motion";

const values = [
  {
    icon: Award,
    title: "Calidad Superior",
    description: "Materiales de gama alta con certificaciones de durabilidad.",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: Users,
    title: "Equipo Experto",
    description: "Maestros carpinteros con pasión por el detalle.",
    color: "bg-slate-50",
    iconColor: "text-slate-900",
  },
  {
    icon: Target,
    title: "Precisión Láser",
    description: "Medidas milimétricas para encajes perfectos en tu hogar.",
    color: "bg-slate-50",
    iconColor: "text-slate-900",
  },
  {
    icon: Heart,
    title: "Garantía Total",
    description: "Acompañamiento post-venta para tu tranquilidad.",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

const About = () => {
  return (
    <section id="conocenos" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LADO IZQUIERDO: TEXTO EDITORIAL */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-8"
          >
            <motion.div variants={itemVariants}>
              <span className="text-orange-600 font-bold tracking-[0.3em] uppercase text-sm block mb-4">
                Desde el Taller
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-950 leading-tight">
                Pasión por la <br />
                <span className="text-orange-600 italic">Melamina</span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-xl text-slate-700 font-medium leading-relaxed">
                En <span className="font-bold">Estudio Husheniid</span>, no solo fabricamos muebles; diseñamos experiencias que transforman tu forma de vivir.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Con más de 10 años en Huancayo, hemos perfeccionado el arte de combinar la tecnología moderna con la precisión artesanal, asegurando que cada corte y cada acabado sea impecable.
              </p>
            </motion.div>

            {/* Grid de Valores (Estilo Minimalista) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className={`${value.color} p-6 rounded-[2rem] transition-all duration-300 border border-transparent hover:border-orange-200 hover:shadow-xl hover:shadow-orange-600/5`}
                >
                  <value.icon className={`${value.iconColor} w-6 h-6 mb-4`} />
                  <h3 className="font-bold text-slate-900 mb-1">{value.title}</h3>
                  <p className="text-xs text-slate-500 leading-snug">{value.description}</p>
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
            {/* Elemento Decorativo: Marco Naranja */}
            <div className="absolute -top-6 -right-6 w-64 h-64 bg-orange-100 rounded-full blur-[80px] -z-10 opacity-60"></div>
            
            <div className="relative group">
              {/* Marco de diseño para la imagen */}
              <div className="absolute -inset-4 border border-slate-100 rounded-[3rem] -z-10 group-hover:border-orange-200 transition-colors duration-500"></div>
              
              <div className="overflow-hidden rounded-[2.8rem] shadow-2xl relative">
                <img
                  src={workshopImage}
                  alt="Nuestro taller de carpintería"
                  className="w-full object-cover aspect-[4/5] lg:aspect-[3/4] transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Overlay flotante informativo */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-900 font-bold text-2xl">+5 Años</p>
                      <p className="text-slate-500 text-sm tracking-widest uppercase font-semibold">Experiencia Real</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white">
                      <Users size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Elemento gráfico flotante */}
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 hidden xl:block p-6 bg-slate-900 text-white rounded-[2rem] shadow-2xl"
              >
                <p className="text-sm font-bold tracking-widest uppercase opacity-60 mb-2">Ubicación</p>
                <p className="font-medium">Huancayo, Perú</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;