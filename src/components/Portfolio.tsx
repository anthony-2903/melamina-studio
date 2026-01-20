"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const trackRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  // 1. Cargar datos asegurando que no queden estados vacíos
  const fetchAll = useCallback(async () => {
    const { data: catData } = await supabase.from("categories").select("*");
    setCategories(catData ?? []);

    const { data: portData } = await supabase
      .from("portfolios")
      .select("*")
      .order("created_at", { ascending: false });

    const mapped = (portData ?? []).map((p: any) => ({
      ...p,
      category: catData?.find((c: any) => c.id === p.category_id) ?? null,
    }));

    setPortfolio(mapped);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // 2. Filtro reactivo
  const filtered = useMemo(() => {
    if (selectedCategory === "all") return portfolio;
    return portfolio.filter((item) => item.category_id === selectedCategory);
  }, [portfolio, selectedCategory]);

  // 3. Duplicación para efecto infinito (mínimo 3 veces para evitar huecos blancos)
  const duplicated = useMemo(() => {
    if (filtered.length === 0) return [];
    return [...filtered, ...filtered, ...filtered];
  }, [filtered]);

  // 4. Reinicio de animación al filtrar
  useEffect(() => {
    if (duplicated.length === 0) return;

    const start = () => {
      const el = trackRef.current;
      if (!el) return;
      const moveDistance = el.scrollWidth / 3;
      controls.start({
        x: [0, -moveDistance],
        transition: { x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 30 } },
      });
    };

    controls.stop();
    start();
  }, [controls, duplicated]);

  return (
    <section id="portafolio" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-l-2 border-[#BB9E7A] pl-8 text-[#524F4A]">
          <div>
            <div className="flex items-center gap-2 mb-2">
             
              <span className="text-[#BB9E7A] text-[10px] font-black uppercase tracking-[0.4em]">Exhibición</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter italic font-serif leading-none">
              Nuestra <span className="text-[#BB9E7A] not-italic">Colección</span>
            </h2>
          </div>

          {/* SELECT VISIBLE CON DISEÑO TAILWIND */}
          <div className="relative w-full md:w-72">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#524F4A]/60 font-bold mb-3 block">
              Filtrar por Estilo
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-slate-50 border-2 border-slate-200 text-[#524F4A] font-bold text-[11px] uppercase tracking-widest px-6 py-4 rounded-xl cursor-pointer focus:outline-none focus:border-[#BB9E7A] transition-all"
              >
                <option value="all">Ver todo el catálogo</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#BB9E7A] pointer-events-none" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA DEL CARRUSEL: Forzamos Opacidad 100 */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            ref={trackRef}
            initial={{ opacity: 1 }} // FORZAMOS QUE NO INICIE EN 0
            animate={controls}
            className="flex gap-10 opacity-100" 
          >
            {duplicated.map((project, idx) => (
              <Dialog key={`${project.id}-${idx}`}>
                <DialogTrigger asChild>
                  <div className="relative flex-shrink-0 w-[300px] md:w-[450px] aspect-[3/4] rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl">
                    {/* Imagen con fallback de fondo gris para que no se vea blanco si tarda en cargar */}
                    <div className="absolute inset-0 bg-slate-100">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                      />
                    </div>

                    {/* Overlay oscurecido para que el texto SIEMPRE sea legible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity" />
                    
                    <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
                      <p className="text-[#BB9E7A] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                        {project.category?.name || "Husheniid"}
                      </p>
                      <h3 className="text-white text-3xl md:text-4xl font-serif italic mb-4 leading-tight">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="h-[1px] w-12 bg-[#BB9E7A]" />
                        <span className="text-white/80 text-[10px] uppercase tracking-widest font-bold">Ver</span>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-5xl bg-white border-none rounded-[3rem] p-0 overflow-hidden">
                  <DialogTitle className="sr-only">{project.title}</DialogTitle>
                  <div className="grid md:grid-cols-2 h-full">
                    <img src={project.image_url} className="h-full w-full object-cover" />
                    <div className="p-16 flex flex-col justify-center space-y-6">
                      <Badge className="w-fit bg-[#BB9E7A]">{project.category?.name}</Badge>
                      <h3 className="text-5xl font-serif italic text-[#524F4A]">{project.title}</h3>
                      <p className="text-[#524F4A]/70 text-lg leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}