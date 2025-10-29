import { Award, Users, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import workshopImage from "@/assets/about-workshop.jpg";
import { motion } from "framer-motion";

const values = [
  {
    icon: Award,
    title: "Calidad Superior",
    description: "Utilizamos solo materiales de primera calidad",
  },
  {
    icon: Users,
    title: "Equipo Profesional",
    description: "Carpinteros con años de experiencia",
  },
  {
    icon: Target,
    title: "Precisión",
    description: "Medidas exactas y acabados impecables",
  },
  {
    icon: Heart,
    title: "Satisfacción Garantizada",
    description: "Tu felicidad es nuestro objetivo",
  },
];

// Variants para el texto principal
const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

// Variants para las tarjetas
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8 } },
};

// Variant para la imagen
const imageVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8 } },
};

const About = () => {
  return (
    <section id="conocenos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto principal y tarjetas */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <motion.div variants={textVariants}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
                Conócenos
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Somos un equipo de carpinteros profesionales con más de 10 años de experiencia en la fabricación de muebles de melamina a medida. Nos especializamos en transformar espacios con soluciones funcionales y elegantes.
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Nuestro compromiso es ofrecer productos de la más alta calidad, combinando diseño innovador con técnicas tradicionales de carpintería. Cada proyecto es único y lo tratamos con la dedicación que merece.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <value.icon className="w-8 h-8 text-accent mb-2" />
                      <h3 className="font-heading font-semibold text-card-foreground mb-1">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Imagen del taller */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
            <img
              src={workshopImage}
              alt="Nuestro taller de carpintería"
              className="rounded-lg shadow-2xl w-full object-cover aspect-[4/3]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
