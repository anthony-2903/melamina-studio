"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowUpRight } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  type: string;
  description: string;
  image_url?: string;
  created_at?: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function PortfolioList() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error:", error);
      else setPortfolio(data || []);
      setLoading(false);
    };
    fetchPortfolio();
  }, []);

  // Calculamos los límites del arrastre dinámicamente según el tamaño de la pantalla
  useEffect(() => {
    if (!loading && scrollRef.current && containerRef.current) {
      const scrollWidth = scrollRef.current.offsetWidth;
      const containerWidth = containerRef.current.offsetWidth;
      setConstraints({ left: -(scrollWidth - containerWidth + 40), right: 0 });
    }
  }, [loading, portfolio]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#BB9E7A] animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-[#DBD8D3]/10 overflow-hidden w-full select-none">
      <div className="container mx-auto px-6 mb-16">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#BB9E7A] font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
              Curaduría de Proyectos
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#524F4A]">
              Galería de <span className="text-[#BB9E7A] italic font-serif">Autor</span>
            </h2>
            <p className="text-slate-400 text-xs mt-4 uppercase tracking-widest md:hidden">
              ← Desliza para explorar →
            </p>
          </div>
        </header>
      </div>

      {/* Contenedor del Visor */}
      <div ref={containerRef} className="relative w-full px-6 cursor-grab active:cursor-grabbing">
        <motion.div
          ref={scrollRef}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.1} // Efecto rebote al llegar al final
          dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
          className="flex gap-8 w-max"
        >
          <AnimatePresence>
            {portfolio.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                // Evitamos que el click se dispare mientras arrastramos
                onPointerDown={(e) => e.currentTarget.setAttribute('data-drag', 'false')}
                onPointerMove={(e) => e.currentTarget.setAttribute('data-drag', 'true')}
                onClick={(e) => {
                  if (e.currentTarget.getAttribute('data-drag') === 'true') {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                whileHover={{ y: -10 }}
                className="group w-[300px] md:w-[450px] lg:w-[550px] pointer-events-auto"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-[#DBD8D3] shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-[#524F4A]/10">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      draggable="false" // Importante para que no interfiera con el drag de framer
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#524F4A]/30 font-serif italic uppercase text-xs tracking-widest">Sin registro visual</div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#524F4A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <div className="flex items-center gap-4 text-white">
                      <div className="h-10 w-10 rounded-full border border-[#BB9E7A]/50 flex items-center justify-center backdrop-blur-sm">
                         <ArrowUpRight size={18} className="text-[#BB9E7A]" />
                      </div>
                      <span className="font-bold text-[10px] uppercase tracking-[0.3em]">Detalles</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 px-4 transition-all duration-500 group-hover:translate-x-3">
                  <div className="flex items-center gap-3 mb-2">
                     <span className="text-[#BB9E7A] text-[10px] font-bold uppercase tracking-widest">{item.type}</span>
                     <div className="h-[1px] w-12 bg-[#BB9E7A]/30 group-hover:w-20 transition-all duration-500" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#524F4A] tracking-tight group-hover:text-[#BB9E7A] transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-slate-500/70 font-light text-sm line-clamp-1 italic max-w-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {portfolio.length === 0 && (
        <div className="container mx-auto px-6 mt-10">
          <div className="text-center py-20 border border-dashed border-[#DBD8D3] rounded-[3rem]">
             <p className="text-[#524F4A]/40 font-light tracking-[0.3em] uppercase text-[10px]">Esperando curaduría...</p>
          </div>
        </div>
      )}
    </section>
  );
}