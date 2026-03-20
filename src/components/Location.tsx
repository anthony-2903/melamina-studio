import { motion, Variants } from "framer-motion";
import { MapPin, Navigation, Phone, Clock, ArrowRight } from "lucide-react";

const Location = () => {
  const lat = -12.053199;
  const lng = -75.245915;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.455648834461!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAzJzExLjUiUyA3NcKwMTQnNDUuMyJX!5e0!3m2!1ses!2spe!4v1705345000000!5m2!1ses!2spe`;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.3, 0.1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="ubicacion" className="relative py-32 bg-[#DBD8D3]/10 overflow-hidden font-sans">
      {/* Círculos de Radar Decorativos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] -z-10 pointer-events-none">
        {[1, 1.5, 2].map((s, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: s, opacity: [0, 0.2, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: i * 2, ease: "linear" }}
            className="absolute inset-0 border border-[#BB9E7A]/20 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <motion.span variants={itemVariants} className="text-[#BB9E7A] font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
            Ubicación Estratégica
          </motion.span>

          <motion.h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-[#524F4A] mb-8 leading-[0.9] flex flex-wrap justify-center overflow-hidden">
            {["Ven", "a", "conocer"].map((word, i) => (
              <span key={i} className="overflow-hidden inline-block pb-4 -mb-4 mr-[0.25em]">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "110%", opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="overflow-hidden inline-block pb-4 -mb-4">
              <motion.span
                className="text-[#BB9E7A] italic font-serif inline-block origin-bottom-left"
                variants={{
                  hidden: { y: "120%", opacity: 0, rotateZ: 5 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    rotateZ: 0,
                    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
                  }
                }}
              >
                nuestroestudio
              </motion.span>
            </span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-slate-500 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Un espacio diseñado para la inspiración. Encuéntranos en el corazón de Pilcomayo y explora texturas que transformarán tu hogar.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Card con Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative group"
          >
            <div className="p-10 md:p-12 rounded-[3.5rem] bg-white/60 backdrop-blur-2xl border border-white/50 shadow-[0_32px_64px_-16px_rgba(82,79,74,0.08)] relative z-10 overflow-hidden">
              {/* Brillos internos decorativos */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#BB9E7A]/5 rounded-full blur-[40px] group-hover:bg-[#BB9E7A]/10 transition-colors" />

              <div className="space-y-12">
                {[
                  {
                    icon: MapPin,
                    title: "Estudio Principal",
                    desc: "AV Coronel Parra, Cruce de Pilcomayo, Huancayo",
                    color: "bg-[#524F4A]"
                  },
                  {
                    icon: Phone,
                    title: "Llamada Directa",
                    desc: "+51 979 923 148",
                    color: "bg-[#BB9E7A]"
                  },
                  {
                    icon: Clock,
                    title: "Horario de Autor",
                    desc: "Lun - Sáb: 9:00 AM — 6:00 PM",
                    color: "bg-[#524F4A]"
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    className="flex gap-6 group/item"
                  >
                    <div className={`w-14 h-14 shrink-0 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200 group-hover/item:scale-110 transition-transform duration-500`}>
                      <item.icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[#524F4A] font-bold text-lg tracking-tight mb-1">{item.title}</h4>
                      <p className="text-slate-500 leading-snug font-light text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-14 w-full flex items-center justify-between px-8 py-6 bg-[#524F4A] text-white font-bold rounded-[2rem] transition-all shadow-2xl shadow-[#524F4A]/20 group/btn"
              >
                <div className="flex items-center gap-3">
                  <Navigation size={18} fill="currentColor" />
                  <span className="tracking-[0.2em] text-[10px] uppercase">Ruta en Google Maps</span>
                </div>
                <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
              </motion.a>
            </div>
          </motion.div>

          {/* Mapa con Efecto Radar */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative"
          >
            {/* Elementos flotantes alrededor del mapa */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 px-6 py-2 bg-[#BB9E7A] text-white rounded-full z-20 text-[9px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Visítanos Ahora
            </motion.div>

            {/* Contenedor de Mapa con Borde Escultural */}
            <div className="relative p-3 rounded-[3.5rem] bg-gradient-to-tr from-[#BB9E7A]/20 via-[#DBD8D3]/50 to-white shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

              <div className="relative h-[550px] rounded-[2.8rem] overflow-hidden border border-white shadow-inner">
                <iframe
                  src={mapEmbedUrl}
                  className="w-full h-full grayscale-[0.3] contrast-[1.1] hover:grayscale-0 transition-all duration-1000"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Estudio Husheniid"
                ></iframe>
              </div>
            </div>

            {/* Acento lateral decorativo */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#524F4A]/5 rounded-full blur-[40px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
