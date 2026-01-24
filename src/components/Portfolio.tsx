"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, X, Instagram, Facebook, Music2, LayoutGrid, Infinity as InfinityIcon } from "lucide-react";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  const trackRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const fetchAll = useCallback(async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const filtered = useMemo(() => {
    if (selectedCategory === "all") return portfolio;
    return portfolio.filter((item) => item.category_id === selectedCategory);
  }, [portfolio, selectedCategory]);

  // Multiplicamos por 4 para que el loop sea infinito y fluido sin saltos visuales
  const duplicated = useMemo(() => {
    if (filtered.length === 0 || viewMode === "grid") return filtered;
    return [...filtered, ...filtered, ...filtered, ...filtered];
  }, [filtered, viewMode]);

  const startAnimation = useCallback(async () => {
    if (viewMode === "grid" || duplicated.length === 0) return;
    const el = trackRef.current;
    if (!el) return;
    
    // Calculamos la distancia basada en un solo set del contenido original
    const moveDistance = el.scrollWidth / 4;
    
    await controls.set({ x: 0 }); // Reinicio de posición
    await controls.start({
      x: -moveDistance,
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        duration: 50, // Un poco más lento para elegancia
      },
    });
  }, [controls, duplicated.length, viewMode]);

  useEffect(() => {
    controls.stop();
    startAnimation();
  }, [selectedCategory, viewMode, startAnimation, controls]);

  return (
    <section id="portafolio" className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="border-l-4 border-[#BB9E7A] pl-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#BB9E7A] text-[10px] font-black uppercase tracking-[0.4em]">Exhibición</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic font-serif text-[#524F4A] leading-[0.8]">
              Nuestra <br /> <span className="text-[#BB9E7A] not-italic">Colección</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
             {/* Switch de modo de vista: Carrusel o Grilla */}
            <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-sm">
              <button 
                onClick={() => setViewMode("carousel")} 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all ${viewMode === "carousel" ? "bg-[#524F4A] text-white shadow-lg" : "text-slate-400 hover:text-[#524F4A]"}`}
              >
                <InfinityIcon size={14} /> Carrusel
              </button>
              <button 
                onClick={() => setViewMode("grid")} 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all ${viewMode === "grid" ? "bg-[#524F4A] text-white shadow-lg" : "text-slate-400 hover:text-[#524F4A]"}`}
              >
                <LayoutGrid size={14} /> Galería
              </button>
            </div>

            {/* Selector de categorías */}
            <div className="relative group min-w-[240px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-white border-2 border-slate-100 text-[#524F4A] font-bold text-[11px] uppercase tracking-[0.2em] px-6 py-4 rounded-2xl cursor-pointer outline-none focus:border-[#BB9E7A] transition-all"
              >
                <option value="all">Todos los estilos</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#BB9E7A] pointer-events-none group-hover:translate-y-[-40%] transition-all" size={16} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative min-h-[550px]">
        <AnimatePresence mode="wait">
          {viewMode === "carousel" ? (
            <motion.div 
              key={`carousel-${selectedCategory}`} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <motion.div ref={trackRef} animate={controls} className="flex gap-8 px-4">
                {duplicated.map((project, idx) => (
                  <ProjectCard key={`car-${project.id}-${idx}`} project={project} />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="grid" 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((project) => (
                <ProjectCard key={`grid-${project.id}`} project={project} isGrid />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({ project, isGrid = false }: { project: any; isGrid?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ y: -12 }}
          className={`relative flex-shrink-0 group cursor-pointer overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-slate-100 border border-slate-100 shadow-xl transition-all ${isGrid ? "w-full aspect-[3/4]" : "w-[300px] md:w-[480px] aspect-[3/4]"}`}
        >
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
          
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
            <Badge className="w-fit bg-[#BB9E7A] text-white border-none mb-3 px-4 py-1 text-[9px] uppercase tracking-[0.3em] font-black">
              {project.category?.name || "Husheniid"}
            </Badge>
            <h3 className="text-white text-3xl md:text-5xl font-serif italic leading-[0.9] tracking-tighter">
              {project.title}
            </h3>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-6xl w-[95vw] md:w-[90vw] p-0 overflow-hidden border-none bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl [&>button]:hidden outline-none">
        <DialogClose className="absolute right-8 top-8 z-50 p-4 bg-[#BB9E7A] hover:bg-[#524F4A] text-white rounded-full transition-all duration-500 shadow-2xl border-2 border-white/20">
          <X size={24} strokeWidth={2.5} />
        </DialogClose>

        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        
        <div className="flex flex-col md:flex-row h-full max-h-[92vh] overflow-y-auto md:overflow-hidden">
          {/* Imagen Lateral */}
          <div className="w-full md:w-[55%] h-[350px] md:h-auto relative overflow-hidden">
            <img src={project.image_url} className="w-full h-full object-cover" alt={project.title} />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
          </div>

          {/* Contenido Textual */}
          <div className="w-full md:w-[45%] p-10 md:p-20 flex flex-col justify-center bg-white">
            <span className="text-[#BB9E7A] text-[10px] font-black uppercase tracking-[0.5em] mb-6 block border-l-2 border-[#BB9E7A] pl-4">
              Husheniid Portafolio
            </span>
            
            <h3 className="text-5xl md:text-7xl font-serif italic text-[#524F4A] mb-8 leading-[0.85] tracking-tighter">
              {project.title}
            </h3>

            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] w-12 bg-[#BB9E7A]" />
              <p className="text-[#BB9E7A] font-bold text-[10px] tracking-[0.2em] uppercase">
                {project.category?.name}
              </p>
            </div>

            <p className="text-[#524F4A]/70 text-lg font-light leading-relaxed mb-12 italic">
              "{project.description || "Un diseño pensado para armonizar la elegancia con la funcionalidad moderna."}"
            </p>


            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                 <SocialLink icon={<Instagram size={18} />} href="https://www.instagram.com/hugocaldeton/" />
                 <SocialLink icon={<Facebook size={18} />} href="https://www.facebook.com/profile.php?id=61551909329314#" />
                 <SocialLink icon={<Music2 size={18} />} href="https://www.tiktok.com/@husheniid" />
              </div>
              <span className="text-[8px] uppercase tracking-[0.4em] text-slate-300 font-black">Husheniid Design</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#BB9E7A] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
    >
      {icon}
    </a>
  );
}