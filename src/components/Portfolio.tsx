"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowUpRight } from "lucide-react";

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

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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
  }, [fetchPortfolio]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || portfolio.length === 0) return;

    const startAnimation = () => {
      const halfWidth = el.scrollWidth / 2;
      const duration = Math.max(20, halfWidth / 50); // Velocidad elegante
      controls.start({
        x: [0, -halfWidth],
        transition: {
          x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration },
        },
      });
    };

    startAnimation();
  }, [controls, portfolio]);

  const duplicated = [...portfolio, ...portfolio];

  return (
    <section id="portafolio" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        {/* CABECERA ESTILO MASTERPIECE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-2 border-[#BB9E7A] pl-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-[#BB9E7A]" size={16} />
              <span className="text-[#BB9E7A] text-[10px] font-black uppercase tracking-[0.4em]">Exhibición</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-[#524F4A] tracking-tighter italic font-serif leading-none">
              Nuestra <span className="text-[#BB9E7A] not-italic">Colección</span>
            </h2>
          </div>
          
        </div>
      </div>

      {/* CARRUSEL INFINITO */}
      <div className="relative group/track">
        <motion.div
          ref={trackRef}
          className="flex gap-10 cursor-grab active:cursor-grabbing"
          animate={controls}
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() => {
            const el = trackRef.current;
            if (!el) return;
            const halfWidth = el.scrollWidth / 2;
            controls.start({
              x: [null, -halfWidth],
              transition: { x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 40 } },
            });
          }}
        >
          {duplicated.map((project, idx) => (
            <Dialog key={`${project.id}-${idx}`}>
              <DialogTrigger asChild>
                <motion.div 
                  className="relative flex-shrink-0 w-[300px] md:w-[450px] aspect-[3/4] rounded-[3rem] overflow-hidden group shadow-2xl shadow-black/5"
                >
                  {/* IMAGEN FULL */}
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  
                  {/* OVERLAY TIPO GRADIENTE */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2825] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* CONTENIDO SOBRE IMAGEN */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[#BB9E7A] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                        {project.category?.name || "Husheniid Design"}
                      </p>
                      <h3 className="text-white text-3xl md:text-4xl font-serif italic mb-4 leading-tight">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        <span className="h-[1px] w-12 bg-white/30" />
                        <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Ver Proyecto</span>
                      </div>
                    </div>
                  </div>

                  {/* ICONO FLOTANTE */}
                  <div className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                    <ArrowUpRight size={20} />
                  </div>
                </motion.div>
              </DialogTrigger>

              <DialogContent className="max-w-5xl bg-white border-none rounded-[3rem] p-0 overflow-hidden">
                <DialogTitle className="sr-only">{project.title}</DialogTitle>
                <div className="grid md:grid-cols-2 h-full max-h-[90vh]">
                  <div className="h-[40vh] md:h-full">
                    <img src={project.image_url} className="w-full h-full object-cover" alt={project.title} />
                  </div>
                  <div className="p-12 flex flex-col justify-center space-y-6">
                    <Badge className="w-fit bg-[#BB9E7A] text-white uppercase tracking-widest py-1.5 px-4">{project.category?.name}</Badge>
                    <h3 className="text-5xl font-serif italic text-[#524F4A] leading-tight">{project.title}</h3>
                    <div className="h-1 w-20 bg-[#BB9E7A]" />
                    <p className="text-[#524F4A]/70 text-lg font-light leading-relaxed">{project.description}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>
      </div>
    </section>
  );
}