"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, useAnimation } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  category?: Category | null;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  // ─────────────────────────────
  // FUNCIONES PARA TRAER DATOS
  // ─────────────────────────────
  const fetchCategories = useCallback(async () => {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data ?? []);
    return data ?? [];
  }, []);

  const fetchPortfolio = useCallback(async () => {
    const categoriesData = await fetchCategories();

    const { data } = await supabase
      .from("portfolios")
      .select("*")
      .order("created_at", { ascending: false });

    const mappedPortfolio: PortfolioItem[] = (data ?? []).map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image_url: p.image_url,
      category: categoriesData.find((c: Category) => c.id === p.category_id) ?? null,
    }));

    setPortfolio(mappedPortfolio);
  }, [fetchCategories]);

  // ─────────────────────────────
  // FETCH INICIAL
  // ─────────────────────────────
  useEffect(() => {
    fetchPortfolio();

    // OPCIONAL: escuche cambios en la tabla en tiempo real
    const subscription = supabase
      .channel("public:portfolios")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "portfolios" },
        () => {
          fetchPortfolio(); // refrescar automáticamente
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [fetchPortfolio]);

  // ─────────────────────────────
  // CARRUSEL CONTINUO
  // ─────────────────────────────
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const start = () => {
      const halfWidth = el.scrollWidth / 2;
      const duration = Math.max(8, halfWidth / 100) * 2;
      controls.start({
        x: [0, -halfWidth],
        transition: {
          x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration },
        },
      });
    };

    start();

    const onResize = () => {
      controls.stop();
      start();
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [controls, portfolio]);

  const duplicated = [...portfolio, ...portfolio];

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

        {/* Carrusel */}
        <div className="relative overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex gap-8"
            animate={controls}
            onMouseEnter={() => controls.stop()}
            onMouseLeave={() => {
              const el = trackRef.current;
              if (!el) return;
              const halfWidth = el.scrollWidth / 2;
              const duration = Math.max(8, halfWidth / 150);
              controls.start({
                x: [0, -halfWidth],
                transition: { x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration } },
              });
            }}
          >
            {duplicated.map((project, idx) => (
              <Dialog key={`${project.id}-${idx}`}>
                <DialogTrigger asChild>
                  <motion.div
                    variants={itemVariants}
                    className="group cursor-pointer min-w-[280px] sm:min-w-[320px] lg:min-w-[360px]"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group-hover:bg-amber-500 group-hover:text-white">
                      <div className="relative overflow-hidden aspect-[4/3]">
                        {project.image_url && (
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6 relative">
                        <div className="absolute top-4 right-4">
                          <Eye className="w-6 h-6 text-card-foreground transition-colors group-hover:text-white" />
                        </div>
                        {project.category && (
                          <Badge
                            variant="secondary"
                            className="mb-3 bg-amber-500 text-white"
                          >
                            {project.category.name}
                          </Badge>
                        )}
                        <h3 className="text-xl font-heading font-semibold text-card-foreground mb-2 group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 group-hover:text-white transition-colors">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </DialogTrigger>

                <DialogContent className="w-full max-w-4xl mx-4 sm:mx-auto max-h-[90vh] overflow-auto">
                  <DialogTitle className="sr-only">{project.title}</DialogTitle>
                  <div className="space-y-4 p-4">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full rounded-lg object-cover max-h-[60vh]"
                      />
                    )}
                    {project.category && (
                      <Badge className="mb-3 bg-amber-500 text-white">{project.category.name}</Badge>
                    )}
                    <h3 className="text-2xl font-heading font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
