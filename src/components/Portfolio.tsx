import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { QueryClientProvider, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOptimizedSrcSet, getOptimizedUrl } from "@/lib/cloudinary";
import OptimizedVideo from "@/components/OptimizedVideo";
import { ChevronDown, X, Instagram, Facebook, Music2, LayoutGrid, Infinity as InfinityIcon, MessageCircle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { fetchCategories, fetchPortfolioPage, PORTFOLIO_PAGE_SIZE, type PortfolioItem } from "@/lib/portfolio";
import { queryClient } from "@/lib/queryClient";
import { useMediaPreferences } from "@/hooks/use-media-preferences";

export default function Portfolio() {
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioContent />
    </QueryClientProvider>
  );
}

function PortfolioContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const { isMobile, reduceMotion } = useMediaPreferences();

  const trackRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const categoriesQuery = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const portfolioQuery = useInfiniteQuery({
    queryKey: ["portfolio"],
    queryFn: ({ pageParam }) => fetchPortfolioPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === PORTFOLIO_PAGE_SIZE ? pages.length : undefined,
  });

  const categories = categoriesQuery.data ?? [];
  const portfolio = useMemo(() => portfolioQuery.data?.pages.flat() ?? [], [portfolioQuery.data]);
  const isLoading = categoriesQuery.isLoading || portfolioQuery.isLoading;
  const error = categoriesQuery.error ?? portfolioQuery.error;

  const filtered = useMemo(() => {
    if (selectedCategory === "all") return portfolio;
    return portfolio.filter((item) => item.category_id === selectedCategory);
  }, [portfolio, selectedCategory]);

  // Dos copias bastan para mantener el loop continuo sin duplicar trabajo innecesario.
  const duplicated = useMemo(() => {
    if (filtered.length === 0 || viewMode === "grid" || isMobile || reduceMotion) return filtered;
    return [...filtered, ...filtered];
  }, [filtered, viewMode, isMobile, reduceMotion]);

  const startAnimation = useCallback(async () => {
    if (viewMode === "grid" || duplicated.length === 0 || isLoading || isMobile || reduceMotion) return;
    const el = trackRef.current;
    if (!el) return;
    
    // Calculamos la distancia basada en un solo set del contenido original
    const moveDistance = el.scrollWidth / 2;
    
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
  }, [controls, duplicated.length, viewMode, isLoading, isMobile, reduceMotion]);

  useEffect(() => {
    if (!isLoading && viewMode === "carousel" && filtered.length > 0 && !isMobile && !reduceMotion) {
      // Pequeño delay para asegurar que el DOM se ha pintado y el scrollWidth es correcto
      const timer = setTimeout(() => {
        controls.stop();
        startAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory, viewMode, startAnimation, controls, isLoading, filtered.length, isMobile, reduceMotion]);

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
        {error ? (
          <div className="container mx-auto px-6 py-20 text-center">
            <p className="mb-5 text-[#524F4A]/70">No pudimos cargar los proyectos.</p>
            <Button onClick={() => void portfolioQuery.refetch()} variant="outline">Reintentar</Button>
          </div>
        ) : isLoading ? (
          <div key="loading" className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-full aspect-[3/4] rounded-[3.5rem] bg-slate-100 overflow-hidden relative">
                <Skeleton className="w-full h-full" />
              </div>
            ))}
          </div>
        ) : (
          viewMode === "carousel" ? (
            <div key={`carousel-${selectedCategory}`}>
              <motion.div 
                ref={trackRef} 
                animate={isMobile || reduceMotion ? undefined : controls}
                className={`flex gap-8 px-4 h-full ${isMobile || reduceMotion ? "w-full overflow-x-auto snap-x snap-mandatory pb-6" : "w-max"}`}
                style={{ display: "flex", flexWrap: "nowrap" }}
              >
                {duplicated.map((project, idx) => (
                  <ProjectCard key={`car-${project.id}-${idx}`} project={project} mobileSnap={isMobile || reduceMotion} />
                ))}
              </motion.div>
            </div>
          ) : (
            <div 
              key="grid" 
              className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.length > 0 ? (
                filtered.map((project) => (
                  <ProjectCard key={`grid-${project.id}`} project={project} isGrid />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-slate-400 font-medium italic">No hay proyectos en esta categoría</div>
              )}
            </div>
          )
        )}
      </div>
      {portfolioQuery.hasNextPage && !error && (
        <div className="container mx-auto px-6 pt-10 text-center">
          <Button
            onClick={() => void portfolioQuery.fetchNextPage()}
            disabled={portfolioQuery.isFetchingNextPage}
            className="rounded-full bg-[#524F4A] px-8"
          >
            {portfolioQuery.isFetchingNextPage ? "Cargando..." : "Cargar más proyectos"}
          </Button>
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project, isGrid = false, mobileSnap = false }: { project: PortfolioItem; isGrid?: boolean; mobileSnap?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ y: -12 }}
          className={`relative flex-shrink-0 group cursor-pointer overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-slate-100 border border-slate-100 shadow-xl transition-all ${isGrid ? "w-full aspect-[3/4]" : "w-[82vw] max-w-[480px] md:w-[480px] aspect-[3/4]"} ${mobileSnap ? "snap-center" : ""}`}
        >
          {project.media_type === "video" ? (
            <OptimizedVideo
              src={project.image_url} 
              posterWidth={800}
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 pointer-events-none" 
            />
          ) : (
            <img 
              src={getOptimizedUrl(project.image_url, 800)} 
              srcSet={getOptimizedSrcSet(project.image_url, [480, 800, 1000])}
              sizes={isGrid ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : "(max-width: 768px) 300px, 480px"}
              alt={project.title} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
            />
          )}
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
          {/* Multimedia Lateral */}
          <div className="w-full md:w-[55%] h-[350px] md:h-auto relative overflow-hidden bg-slate-100">
            {project.media_type === "video" ? (
              <OptimizedVideo src={project.image_url} eager posterWidth={1200} className="w-full h-full object-cover pointer-events-none" />
            ) : (
              <img
                src={getOptimizedUrl(project.image_url, 1200)}
                srcSet={getOptimizedSrcSet(project.image_url, [640, 900, 1200])}
                sizes="(max-width: 768px) 100vw, 55vw"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                alt={project.title}
              />
            )}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none" />
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


            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex gap-3">
                 <SocialLink icon={<Instagram size={18} />} href="https://www.instagram.com/hugocaldeton/" />
                 <SocialLink icon={<Facebook size={18} />} href="https://www.facebook.com/profile.php?id=61551909329314#" />
                 <SocialLink icon={<Music2 size={18} />} href="https://www.tiktok.com/@husheniid" />
              </div>
              
              <Button 
                asChild
                className="w-full sm:w-auto rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white px-8 h-12 transition-all duration-300 shadow-lg shadow-[#25D366]/20 group"
              >
                <a 
                  href={`https://wa.me/51979923148?text=${encodeURIComponent(`Hola Husheniid, me interesa el proyecto "${project.title}". ¿Podrían brindarme más información?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle size={18} className="fill-white/20" />
                  Consultar Proyecto
                </a>
              </Button>
            </div>
            <div className="mt-8 text-center md:text-right">
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
