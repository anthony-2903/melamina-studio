import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-kitchen.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Cocina de melamina moderna"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          <Badge variant="secondary" className="mb-4">
            Fabricación a medida
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground text-balance">
            Muebles de melamina a medida — calidad y diseño para tu hogar
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto text-balance">
            Salas, cocinas y empotrados personalizados. Fabricación e instalación profesional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" variant="secondary" className="min-w-[200px]">
              <a href="#portafolio">Ver Portafolio</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[200px] border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="#contacto">Solicitar Cotización</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
