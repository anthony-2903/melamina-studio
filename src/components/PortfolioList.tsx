"use client";
import { useEffect, useState } from "react";
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

// Variantes para la aparición inicial de la lista
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Variantes de la tarjeta con transiciones suaves (In/Out)
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // Custom cubic-bezier para fluidez
  }
};

export default function PortfolioList() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        <header className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-950">
              Galería de <span className="text-orange-600 italic">Autor</span>
            </h2>
            <p className="text-slate-500 mt-6 text-xl max-w-xl border-l-2 border-orange-500 pl-6">
              Proyectos de alta gama fabricados con precisión artesanal en Huancayo.
            </p>
          </div>
        </header>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence>
            {portfolio.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -15,
                  transition: { duration: 0.4, ease: "easeOut" } 
                }}
                className="group cursor-pointer"
              >
                {/* Contenedor de Imagen con Esquinas Redondeadas Suaves */}
                <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-sm transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-orange-600/20">
                  {item.image_url ? (
                    <motion.img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">Sin Imagen</div>
                  )}

                  {/* Overlay Gradiente Dinámico */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <div className="flex items-center gap-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="font-bold text-lg uppercase tracking-widest">Ver Proyecto</span>
                      <ArrowUpRight size={24} className="text-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Info Textual Fuera de la Imagen para Limpieza Visual */}
                <div className="mt-8 px-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50 rounded-full text-[10px] py-0 px-3 uppercase font-black">
                      {item.type}
                    </Badge>
                    <div className="h-[1px] flex-grow bg-slate-100 group-hover:bg-orange-200 transition-colors duration-500" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors duration-300 tracking-tight">
                    {item.title}
                  </h3>
                  
                  <p className="mt-2 text-slate-500 leading-relaxed text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {portfolio.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-slate-100 rounded-[3rem]">
             <p className="text-slate-400 font-medium">No se encontraron proyectos registrados.</p>
          </div>
        )}
      </div>
    </section>
  );
}