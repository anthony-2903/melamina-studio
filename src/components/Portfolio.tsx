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

  useEffect(() => {
    fetchPortfolio();

    const subscription = supabase
      .channel("public:portfolios")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "portfolios" },
        () => {
          fetchPortfolio();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [fetchPortfolio]);

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
    <section id="portafolio" className="py-20 bg-[#DBD8D3]/30">
      <div className="container mx-auto px-4">
        {/* Título */}
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[#524F4A] mb-4"
            variants={itemVariants}
          >
            Nuestro <span className="text-[#BB9E7A] italic font-serif">Portafolio</span>
          </motion.h2>
          <motion.p
            className="text-slate-500 text-lg max-w-2xl mx-auto font-light"
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
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-[#524F4A]/5 transition-all duration-500 transform hover:-translate-y-2 group-hover:bg-[#524F4A]">
                      <div className="relative overflow-hidden aspect-[4/3]">
                        {project.image_url && (
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#524F4A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6 relative">
                        <div className="absolute top-4 right-4">
                          <Eye className="w-6 h-6 text-[#BB9E7A] transition-colors group-hover:text-white" />
                        </div>
                        {project.category && (
                          <Badge
                            variant="secondary"
                            className="mb-3 bg-[#BB9E7A] text-white hover:bg-[#BB9E7A]"
                          >
                            {project.category.name}
                          </Badge>
                        )}
                        <h3 className="text-xl font-bold text-[#524F4A] mb-2 group-hover:text-white transition-colors tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-slate-500 line-clamp-2 group-hover:text-[#DBD8D3] transition-colors font-light">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </DialogTrigger>

                <DialogContent className="w-full max-w-4xl mx-4 sm:mx-auto max-h-[90vh] overflow-auto border-[#DBD8D3] bg-white">
                  <DialogTitle className="sr-only">{project.title}</DialogTitle>
                  <div className="space-y-6 p-4">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full rounded-2xl object-cover max-h-[60vh] shadow-2xl"
                      />
                    )}
                    <div className="flex flex-col gap-2">
                      {project.category && (
                        <Badge className="w-fit bg-[#BB9E7A] text-white hover:bg-[#BB9E7A]">{project.category.name}</Badge>
                      )}
                      <h3 className="text-3xl font-bold text-[#524F4A] tracking-tighter">{project.title}</h3>
                      <div className="h-[2px] w-12 bg-[#BB9E7A] mb-2" />
                      <p className="text-slate-600 leading-relaxed text-lg font-light">{project.description}</p>
                    </div>
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