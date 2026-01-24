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
import { ChevronDown, X, Instagram, Facebook, Music2 } from "lucide-react";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  const duplicated = useMemo(() => {
    if (filtered.length === 0) return [];
    return [...filtered, ...filtered, ...filtered];
  }, [filtered]);

  // MEJORA SELECCIÓN: Reinicio de animación al cambiar categoría
  const startAnimation = useCallback(async () => {
    if (duplicated.length === 0) return;
    const el = trackRef.current;
    if (!el) return;
    const moveDistance = el.scrollWidth / 3;
    
    await controls.set({ x: 0 }); // Reinicio atómico del carrusel
    await controls.start({
      x: -moveDistance,
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        duration: 40,
      },
    });
  }, [controls, duplicated.length]);

  useEffect(() => {
    controls.stop();
    startAnimation();
  }, [selectedCategory, startAnimation, controls]);

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

          {/* MEJORA SELECT: Estilo premium con hover dinámico */}
          <div className="relative w-full md:w-80">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#524F4A]/60 font-bold mb-3 block">Filtrar por Estilo</label>
            <div className="relative group">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-slate-50 border-2 border-slate-100 text-[#524F4A] font-bold text-[11px] uppercase tracking-[0.2em] px-6 py-5 rounded-2xl cursor-pointer outline-none focus:border-[#BB9E7A] transition-all duration-300"
              >
                <option value="all">Ver todo el catálogo</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#BB9E7A] group-hover:scale-110 transition-transform duration-300">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`carousel-${selectedCategory}`} // Obliga a reiniciar el DOM del carrusel
            ref={trackRef}
            initial={{ opacity: 0 }}
            animate={controls}
            whileInView={{ opacity: 1 }}
            className="flex gap-6 md:gap-10"
          >
            {duplicated.map((project, idx) => (
              <ProjectCard key={`${project.id}-${idx}`} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ y: -10 }}
          className="relative flex-shrink-0 w-[280px] md:w-[450px] aspect-[3/4] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group cursor-pointer shadow-xl bg-slate-100"
        >
          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80" />
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
            <p className="text-[#BB9E7A] text-[10px] font-bold uppercase tracking-[0.4em] mb-2">{project.category?.name || "Husheniid"}</p>
            <h3 className="text-white text-2xl md:text-4xl font-serif italic leading-tight">{project.title}</h3>
          </div>
        </motion.div>
      </DialogTrigger>

      {/* SOLUCIÓN X: Usamos [&>button]:hidden para quitar la X por defecto de shadcn 
        y dejamos solo tu botón circular.
      */}
      <DialogContent className="max-w-5xl w-[94vw] md:w-full bg-white border-none rounded-[2.5rem] md:rounded-[4rem] p-0 overflow-hidden outline-none [&>button]:hidden">
        
        {/* Tu botón circular único */}
        <DialogClose className="absolute right-6 top-6 z-50 p-4 bg-[#BB9E7A] hover:bg-[#a18868] text-white rounded-full transition-all shadow-xl border-2 border-white flex items-center justify-center">
          <X size={24} strokeWidth={2.5} />
        </DialogClose>

        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <div className="flex flex-col md:grid md:grid-cols-2 h-full max-h-[90vh]">
          <div className="relative h-[300px] md:h-full w-full overflow-hidden">
            <img src={project.image_url} className="h-full w-full object-cover" alt={project.title} />
          </div>
          <div className="p-8 md:p-16 flex flex-col justify-center bg-white overflow-y-auto">
            <div className="mb-6">
              <Badge className="bg-[#BB9E7A] text-white border-none px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold">
                {project.category?.name}
              </Badge>
            </div>
            <h3 className="text-4xl md:text-6xl font-serif italic text-[#524F4A] leading-[1.1] mb-6 tracking-tighter">
              {project.title}
            </h3>
            <div className="h-[2px] w-16 bg-[#BB9E7A] mb-8" />
            <p className="text-[#524F4A]/80 text-lg font-light leading-relaxed mb-12">
              {project.description}
            </p>
            <div className="mt-auto pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black">Proyecto Exclusivo</span>
              <div className="flex gap-4">
                 <SocialLink icon={<Instagram size={18} />} href="https://www.instagram.com/hugocaldeton/" />
                 <SocialLink icon={<Facebook size={18} />} href="https://www.facebook.com/profile.php?id=61551909329314#" />
                 <SocialLink icon={<Music2 size={18} />} href="https://www.tiktok.com/@husheniid" />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#BB9E7A] hover:text-white transition-all">
      {icon}
    </a>
  );
}