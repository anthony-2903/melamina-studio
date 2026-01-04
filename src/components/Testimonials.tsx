import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

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
    content: "Contraté a Husheniid para mi closet empotrado y quedé encantado. La atención personalizada y la puntualidad en la entrega fueron impecables.",
    rating: 5,
  },
  {
    name: "Ana Torres",
    role: "Cliente Satisfecha",
    content: "El mueble de sala que diseñaron para mi hogar es perfecto. Aprovecharon cada espacio y el acabado es impecable. ¡Totalmente recomendados!",
    rating: 5,
  },
];

// Variants para container
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

// Variants para cada tarjeta
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } },
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Título */}
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
            variants={{ hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          >
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </motion.p>
        </motion.div>

        {/* Grid de testimonials */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={cardVariants}>
              <Card className="hover:shadow-xl transition-all duration-300">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
