const Location = () => {
  return (
    <section id="ubicacion" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Ubícanos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Visítanos en nuestro tienda o agenda una visita técnica
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-fade-up">
          <div className="bg-card rounded-lg overflow-hidden shadow-xl">
            {/* Google Maps Embed - Replace with actual location */}
            <div className="aspect-video bg-muted flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62411.19741788604!2d-77.08091779155518!3d-12.046374042684825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b5d35662c7%3A0x14206cb9cc452e4a!2sLima%2C%20Peru!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Demo"
              />
            </div>
            <div className="p-8 text-center">
              <h3 className="text-xl font-heading font-semibold text-card-foreground mb-2">
                Av. Principal 123, Distrito
              </h3>
              <p className="text-muted-foreground mb-4">Lima, Perú</p>
              <a
                href="https://maps.google.com/?q=Lima,Peru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Ver en Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
