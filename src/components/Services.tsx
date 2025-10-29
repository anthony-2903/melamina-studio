import { Ruler, Hammer, Truck, Wrench, Palette, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Ruler,
    title: "Diseño Personalizado",
    description: "Creamos diseños únicos adaptados a tus espacios y necesidades específicas.",
  },
  {
    icon: Hammer,
    title: "Fabricación de Calidad",
    description: "Utilizamos melamina de primera calidad con acabados profesionales y duraderos.",
  },
  {
    icon: Truck,
    title: "Instalación Profesional",
    description: "Nuestro equipo realiza la instalación completa con garantía de satisfacción.",
  },
  {
    icon: Wrench,
    title: "Consultoría de Medidas",
    description: "Visita técnica gratuita para tomar medidas exactas de tus espacios.",
  },
  {
    icon: Palette,
    title: "Variedad de Acabados",
    description: "Amplia gama de colores y texturas para combinar con tu decoración.",
  },
  {
    icon: Shield,
    title: "Garantía de Calidad",
    description: "Respaldamos nuestro trabajo con garantía en materiales y mano de obra.",
  },
];

const Services = () => {
  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluciones completas para tus muebles de melamina
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-card-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
