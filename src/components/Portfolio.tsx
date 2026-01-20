"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, X, Instagram, Facebook, Music2 } from "lucide-react";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const trackRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const fetchAll = useCallback(async () => {
    const { data: catData } = await supabase.from("categories").select("*");
    setCategories(catData ?? []);
    const { data: portData } = await supabase.from("portfolios").select("*").order("created_at", { ascending: false });
    
    const mapped = (portData ?? []).map((p: any) => ({
      ...p,
      category: catData?.find((c: any) => c.id === p.category_id) ?? null,
    }));
    setPortfolio(mapped);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const filtered = useMemo(() => {
    if (selectedCategory === "all") return portfolio;
    return portfolio.filter((item) => item.category_id === selectedCategory);
  }, [portfolio, selectedCategory]);

  const duplicated = useMemo(() => {
    if (filtered.length === 0) return [];
    return [...filtered, ...filtered, ...filtered];
  }, [filtered]);

  useEffect(() => {
    if (duplicated.length === 0) return;
    const start = () => {
      const el = trackRef.current;
      if (!el) return;
      const moveDistance = el.scrollWidth / 3;
      controls.start({
        x: [0, -moveDistance],
        transition: { x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 35 } },
      });
    };
    controls.stop();
    start();
  }, [controls, duplicated]);

  return (
    <section id="portafolio" className="py-24 bg-white overflow-hidden">
      {/* HEADER DEL PORTAFOLIO */}
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

          {/* FILTRO SELECT */}
          <div className="relative w-full md:w-72">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#524F4A]/60 font-bold mb-3 block">
              Filtrar por Estilo
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-slate-50 border-2 border-slate-200 text-[#524F4A] font-bold text-[11px] uppercase tracking-widest px-6 py-4 rounded-xl cursor-pointer outline-none focus:border-[#BB9E7A] transition-all"
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

      {/* CARRUSEL INFINITO */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            ref={trackRef}
            initial={{ opacity: 1 }}
            animate={controls}
            className="flex gap-6 md:gap-10 opacity-100" 
          >
            {duplicated.map((project, idx) => (
              <Dialog key={`${project.id}-${idx}`}>
                <DialogTrigger asChild>
                  <div className="relative flex-shrink-0 w-[280px] md:w-[450px] aspect-[3/4] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl">
                    <div className="absolute inset-0 bg-slate-100">
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity" />
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                      <p className="text-[#BB9E7A] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{project.category?.name || "Husheniid"}</p>
                      <h3 className="text-white text-2xl md:text-4xl font-serif italic mb-4 leading-tight">{project.title}</h3>
                    </div>
                  </div>
                </DialogTrigger>

                {/* --- DISEÑO MODAL ADAPTADO --- */}
                <DialogContent className="max-w-5xl w-[92vw] md:w-full bg-white border-none rounded-[2rem] md:rounded-[3.5rem] p-0 overflow-hidden outline-none">
                  
                  {/* Botón de cierre visible y flotante */}
                  <DialogClose className="absolute right-4 top-4 z-50 p-2.5 bg-white/90 md:bg-black/10 hover:bg-[#BB9E7A] hover:text-white backdrop-blur-md rounded-full text-[#524F4A] md:text-white transition-all shadow-lg border border-slate-100 md:border-none">
                    <X size={20} />
                  </DialogClose>

                  <DialogTitle className="sr-only">{project.title}</DialogTitle>
                  
                  <div className="flex flex-col md:grid md:grid-cols-2 h-full max-h-[85vh] md:max-h-[90vh]">
                    
                    {/* PARTE SUPERIOR (Imagen en Móvil / Izquierda en Desktop) */}
                    <div className="relative h-[250px] sm:h-[350px] md:h-full w-full overflow-hidden">
                      <img src={project.image_url} className="h-full w-full object-cover" alt={project.title} />
                      {/* Badge flotante solo en móvil sobre la imagen */}
                      <div className="absolute bottom-4 left-4 md:hidden">
                        <Badge className="bg-[#BB9E7A] text-white border-none px-4 py-1 text-[10px] uppercase tracking-widest">
                          {project.category?.name}
                        </Badge>
                      </div>
                    </div>

                    {/* PARTE INFERIOR (Contenido) con scroll independiente */}
                    <div className="p-8 md:p-16 flex flex-col justify-center bg-white overflow-y-auto">
                      <div className="hidden md:block mb-6">
                        <Badge className="bg-[#BB9E7A] text-white border-none px-6 py-2 text-[10px] uppercase tracking-widest">
                          {project.category?.name}
                        </Badge>
                      </div>
                      
                      <h3 className="text-3xl md:text-5xl font-serif italic text-[#524F4A] leading-tight mb-4 md:mb-8">
                        {project.title}
                      </h3>
                      
                      <div className="h-[1px] w-20 bg-[#BB9E7A]/30 mb-6" />
                      
                      <p className="text-[#524F4A]/70 text-base md:text-lg font-light leading-relaxed mb-10">
                        {project.description}
                      </p>

                      {/* REDES SOCIALES DENTRO DEL MODAL (Toque final de lujo) */}
                      <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-bold">Compartir proyecto</span>
                        <div className="flex gap-3">
                          <a href="https://www.instagram.com/hugocaldeton/" target="_blank" className="text-slate-400 hover:text-[#BB9E7A] transition-colors"><Instagram size={18} /></a>
                          <a href="https://www.facebook.com/profile.php?id=61551909329314#" target="_blank" className="text-slate-400 hover:text-[#BB9E7A] transition-colors"><Facebook size={18} /></a>
                          <a href="https://www.tiktok.com/@husheniid" target="_blank" className="text-slate-400 hover:text-[#BB9E7A] transition-colors"><Music2 size={18} /></a>
                        </div>
                      </div>
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