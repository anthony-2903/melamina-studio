import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import salaImage from "@/assets/portfolio-sala.jpg";
import closetImage from "@/assets/portfolio-closet.jpg";
import officeImage from "@/assets/portfolio-office.jpg";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Sala de estar moderna",
    category: "Sala",
    image: salaImage,
    description: "Mueble de entretenimiento con iluminación LED integrada y almacenamiento optimizado.",
  },
  {
    id: 2,
    title: "Closet empotrado premium",
    category: "Empotrado",
    image: closetImage,
    description: "Sistema de organización completo con cajones, repisas y barras para colgar.",
  },
  {
    id: 3,
    title: "Oficina en casa",
    category: "Oficina",
    image: officeImage,
    description: "Escritorio integrado con biblioteca y almacenamiento funcional.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // solo duration, compatible con TS
};

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="portafolio" className="py-20 bg-muted">
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
            variants={itemVariants}
          >
            Nuestro Portafolio
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Descubre algunos de nuestros proyectos más destacados
          </motion.p>
        </motion.div>

        {/* Grid de proyectos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <Dialog key={project.id}>
              <DialogTrigger asChild>
                <motion.div
                  variants={itemVariants}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {project.category}
                      </Badge>
                      <h3 className="text-xl font-heading font-semibold text-card-foreground mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl">
                <div className="space-y-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full rounded-lg"
                  />
                  <div>
                    <Badge variant="secondary" className="mb-3">
                      {project.category}
                    </Badge>
                    <h3 className="text-2xl font-heading font-bold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
