import { motion } from "framer-motion";
import { MapPin, Navigation, Phone } from "lucide-react";

const Location = () => {
  // Coordenadas reales de Pilcomayo, Huancayo
  const lat = -12.053199;
  const lng = -75.245915;
  
  // URL para Google Maps Mobile/Desktop
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  // URL del Iframe (Ubicación centrada en el Cruce de Pilcomayo)
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.455648834461!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAzJzExLjUiUyA3NcKwMTQnNDUuMyJX!5e0!3m2!1ses!2spe!4v1705345000000!5m2!1ses!2spe`;

  return (
    <section id="ubicacion" className="relative py-32 bg-[#DBD8D3]/20 overflow-hidden">
      {/* Decoración sutil de fondo en Dorado Arena */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#BB9E7A]/5 blur-[120px] rounded-full -z-10"></div>

      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[#BB9E7A] font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
            Presencia Física
          </span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-[#524F4A] mb-6">
            Ven a <span className="text-[#BB9E7A] italic font-serif">Visitarnos</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Nuestra oficina principal se encuentra en el corazón de Pilcomayo. 
            Te invitamos a conocer nuestras muestras de materiales y acabados de lujo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Tarjeta de Información Estilo Carpeta de Diseño */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="p-10 rounded-[2.5rem] bg-white border border-[#DBD8D3] shadow-xl shadow-[#524F4A]/5">
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-14 h-14 shrink-0 bg-[#DBD8D3]/30 rounded-2xl flex items-center justify-center text-[#BB9E7A]">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-[#524F4A] font-bold text-xl tracking-tight">Estudio Principal</h4>
                    <p className="text-slate-500 mt-2 leading-relaxed font-light">
                      AV Coronel Parra, <br /> 
                      <span className="text-[#BB9E7A] font-medium italic">Ref. Cruce de Pilcomayo, Huancayo</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 shrink-0 bg-[#DBD8D3]/30 rounded-2xl flex items-center justify-center text-[#BB9E7A]">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-[#524F4A] font-bold text-xl tracking-tight">Atención Directa</h4>
                    <p className="text-slate-500 mt-2 text-lg font-semibold tracking-tighter">+51 979 923 148</p>
                  </div>
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.02, backgroundColor: "#BB9E7A" }}
                whileTap={{ scale: 0.98 }}
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 w-full flex items-center justify-center gap-3 py-5 bg-[#524F4A] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#524F4A]/20 tracking-widest text-xs"
              >
                <Navigation size={18} fill="currentColor" />
                OBTENER INDICACIONES
              </motion.a>
            </div>
          </motion.div>

          {/* Mapa con Borde de Acento Dorado Arena */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative group"
          >
            {/* El Borde Degradado Dorado Arena */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#BB9E7A] to-[#DBD8D3] rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
            
            <div className="relative h-[500px] rounded-[2.8rem] overflow-hidden border-8 border-white shadow-2xl">
              <iframe
                src={mapEmbedUrl}
                className="w-full h-full grayscale-[0.2] contrast-[1.1]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Estudio Husheniid"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;