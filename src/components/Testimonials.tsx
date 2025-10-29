import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "Cliente Satisfecha",
    content: "Excelente trabajo en mi cocina. El equipo fue muy profesional y el resultado superó mis expectativas. La calidad de los materiales es notable.",
    rating: 5,
  },
  {
    name: "Carlos Ramírez",
    role: "Cliente Satisfecho",
    content: "Contraté a Demo para mi closet empotrado y quedé encantado. La atención personalizada y la puntualidad en la entrega fueron impecables.",
    rating: 5,
  },
  {
    name: "Ana Torres",
    role: "Cliente Satisfecha",
    content: "El mueble de sala que diseñaron para mi hogar es perfecto. Aprovecharon cada espacio y el acabado es impecable. ¡Totalmente recomendados!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="hover:shadow-xl transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
