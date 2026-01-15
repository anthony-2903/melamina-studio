import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";

const Location = () => {
  // Coordenadas de tu tienda
  const lat = -12.053199;
  const lng = -75.245915;
  const address = "AV Coronel Parra, Cruce de Pilcomayo, Huancayo";

  // URL para iniciar navegación directamente
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  // URL del Iframe con marcador (utiliza el API de embed standard)
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1111.1!2d${lng}!3d${lat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDAzJzExLjUiUyA3NcKwMTQnNDUuMyJX!5e0!3m2!1ses!2spe!4v1705345000000!5m2!1ses!2spe`;

  return (
    <section id="ubicacion" className="relative py-24 bg-white overflow-hidden">
      {/* Decoración sutil de fondo */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-50/50 blur-[100px] rounded-full -z-10"></div>

      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Ven a <span className="text-orange-600">Visitarnos</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Estamos ubicados en el corazón de Pilcomayo. ¡Te esperamos para brindarte la mejor atención!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Información de contacto (Aparece desde la izquierda) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-xl">Dirección Exacta</h4>
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      AV Coronel Parra, <br /> 
                      <span className="text-orange-600 font-medium italic text-sm">Ref. Cruce de Pilcomayo</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-xl">Llámanos</h4>
                    <p className="text-slate-600 mt-1 text-lg font-semibold">+51 979 923 148</p>
                  </div>
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgb(234 88 12 / 0.2)" }}
                whileTap={{ scale: 0.97 }}
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 w-full flex items-center justify-center gap-3 py-4 bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-600/20"
              >
                <Navigation size={20} fill="white" />
                INICIAR VIAJE
              </motion.a>
            </div>
          </motion.div>

          {/* Mapa con Borde Degradado (Aparece desde la derecha) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative group"
          >
            {/* El Borde Degradado Naranja */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-orange-600 to-amber-400 rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            
            <div className="relative h-[450px] rounded-[2.2rem] overflow-hidden border-4 border-white shadow-2xl">
              <iframe
                src={mapEmbedUrl}
                className="w-full h-full"
                style={{ border: 0 }}
                
                loading="lazy"
                title="Ubicación exacta de la tienda"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;