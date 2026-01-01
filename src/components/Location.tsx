import { motion } from "framer-motion";

const Location = () => {
  // Variants para el texto principal
  const textVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Variants para la tarjeta del mapa
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <section id="ubicacion" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Texto principal */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Ubícanos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Visítanos en nuestra tienda o agenda una visita técnica
          </p>
        </motion.div>

        {/* Mapa y tarjeta */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          <div className="bg-card rounded-lg overflow-hidden shadow-xl">
            {/* Google Maps Embed */}
            <div className="aspect-video bg-muted flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps?q=-12.053204,-75.245931&hl=es;z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación -12.053204, -75.245931"
              />
            </div>

            {/* Información de dirección */}
            <div className="p-8 text-center">
              <h3 className="text-xl font-heading font-semibold text-card-foreground mb-2">
                AV Coronel Parra, ref Cruce de pilcomayo
              </h3>
              <p className="text-muted-foreground mb-4">Huancayo, Perú</p>
              <div className="flex items-center justify-center gap-4">
                

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=-12.053204,-75.245931"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-accent text-card-foreground px-4 py-2 rounded hover:opacity-90 transition-colors font-medium"
                >
                  Cómo llegar →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
