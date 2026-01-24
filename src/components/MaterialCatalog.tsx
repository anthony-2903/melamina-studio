"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  X,
  Box,
  LayoutGrid,
  Infinity as InfinityIcon,
} from "lucide-react";

// --- MOTOR DE IMÁGENES VITE ---
// Importa todas las imágenes de la carpeta assets de forma masiva
const ASSET_IMAGES = import.meta.glob("/src/assets/highi gloss/**/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

/**
 * Función inteligente para emparejar el material con su archivo físico.
 * Busca coincidencias parciales para ignorar si usaste "\" o "/" o si falta el sufijo "-entero".
 */
const resolveImagePath = (originalPath: string) => {
  const normalizedSearch = originalPath.replace(/\\/g, "/").toLowerCase();
  const foundPath = Object.keys(ASSET_IMAGES).find((key) => 
    key.toLowerCase().includes(normalizedSearch) || 
    normalizedSearch.includes(key.toLowerCase().replace("/src/assets/", ""))
  );
  return foundPath ? (ASSET_IMAGES[foundPath] as string) : "";
};

const RAW_MATERIALS = [
  // COLOR ENTERO
  { id: 1, name: "Blanco", folder: "Color Entero", src: "highi gloss/entero/blanco-entero.jpg", ref: "JC007", finish: "MT / HG" },
  { id: 2, name: "Carbon", folder: "Color Entero", src: "highi gloss/entero/carbon-entero.jpg", ref: "JC381", finish: "MT / HG" },
  { id: 3, name: "Celeste", folder: "Color Entero", src: "highi gloss/entero/celeste-entero.jpg", ref: "JC829", finish: "MT / HG" },
  { id: 4, name: "Mocaccino", folder: "Color Entero", src: "highi gloss/entero/mocaccino-entero.jpg", ref: "JC204", finish: "MT / HG" },
  { id: 5, name: "Negro", folder: "Color Entero", src: "highi gloss/entero/negro-entero.jpg", ref: "JC006", finish: "MT / HG" },
  { id: 6, name: "Plomo", folder: "Color Entero", src: "highi gloss/entero/plomo-entero.jpg", ref: "JC209", finish: "MT / HG" },
  { id: 7, name: "Rojo", folder: "Color Entero", src: "highi gloss/entero/rojo-entero.jpg", ref: "JC010", finish: "MT / HG" },
  { id: 8, name: "Rosado", folder: "Color Entero", src: "highi gloss/entero/rosado-entero.jpg", ref: "JC052", finish: "MT / HG" },
  { id: 9, name: "Taupe", folder: "Color Entero", src: "highi gloss/entero/taupe-entero.jpg", ref: "JC858", finish: "MT / HG" },
  { id: 10, name: "Verde", folder: "Color Entero", src: "highi gloss/entero/verde-entero.jpg", ref: "JC825", finish: "MT / HG" },
  // MÁRMOL
  { id: 11, name: "Mármol Amazonic", folder: "Mármol", src: "highi gloss/marmol/amazonic-marmol.jpg", ref: "JC1210", finish: "MT / HG" },
  { id: 12, name: "Calacatta Mármol", folder: "Mármol", src: "highi gloss/marmol/calacatta-marmol.jpg", ref: "JC984", finish: "MT / HG" },
  { id: 13, name: "Calacatta Negro", folder: "Mármol", src: "highi gloss/marmol/calatta negro-marmol.jpg", ref: "JC766", finish: "MT / HG" },
  { id: 14, name: "Calacatta White", folder: "Mármol", src: "highi gloss/marmol/calatta white-marmol.jpg", ref: "JC945", finish: "MT / HG" },
  { id: 15, name: "Calacatta Exotic", folder: "Mármol", src: "highi gloss/marmol/calcatta exotic-marmol.jpg", ref: "JC774", finish: "MT / HG" },
  { id: 16, name: "Mármol Gris", folder: "Mármol", src: "highi gloss/marmol/gris-marmol.jpg", ref: "JC1184", finish: "MT / HG" },
  { id: 17, name: "Mármol Oro", folder: "Mármol", src: "highi gloss/marmol/oro-marmol.jpg", ref: "JC1183", finish: "MT / HG" },
  { id: 18, name: "Mármol Oscuro", folder: "Mármol", src: "highi gloss/marmol/oscuro-marmol.jpg", ref: "JC1008", finish: "MT / HG" },
  // AMADERADO
  { id: 19, name: "Sebra JC104", folder: "Amaderado", src: "highi gloss/amaderado/sebra-amaderado.jpg", ref: "JC104", finish: "MT" },
  { id: 20, name: "Caramelo JC604", folder: "Amaderado", src: "highi gloss/amaderado/caramelo-amaderado.jpg", ref: "JC604", finish: "MT" },
  // HOLOGRÁFICO
  { id: 21, name: "Gris Holográfico", folder: "Holográfico", src: "highi gloss/holografico/gris-holografico.jpg", ref: "JC040D", finish: "MT / HG" },
  { id: 22, name: "Blanco Holográfico", folder: "Holográfico", src: "highi gloss/holografico/blanco-holografico.jpg", ref: "JC143D", finish: "MT / HG" },
  { id: 23, name: "Beige Holográfico", folder: "Holográfico", src: "highi gloss/holografico/beige-holografico.jpg", ref: "JC857D", finish: "MT / HG" },
  { id: 24, name: "Dorado Holográfico", folder: "Holográfico", src: "highi gloss/holografico/dorado-holografico.jpg", ref: "JC332D", finish: "HG" },
  // PREMIUM
  { id: 25, name: "Blanco Premium", folder: "Premium", src: "highi gloss/premiun/blanco-premiun.jpg", ref: "JC63004", finish: "MT / HG" },
  { id: 26, name: "Capri Premium", folder: "Premium", src: "highi gloss/premiun/capri-premiun.jpg", ref: "JC63022", finish: "MT / HG" },
  { id: 27, name: "Gris Premium", folder: "Premium", src: "highi gloss/premiun/gris-premiun.jpg", ref: "JC63033", finish: "MT / HG" }
];

// Mapeamos los materiales inyectando la URL real procesada por Vite
const LOCAL_MATERIALS = RAW_MATERIALS.map(m => ({
  ...m,
  resolvedSrc: resolveImagePath(m.src)
}));

export default function MaterialCatalog() {
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const trackRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const folders = useMemo(() => 
    Array.from(new Set(LOCAL_MATERIALS.map((m) => m.folder))), 
  []);

  const filtered = useMemo(() => {
    if (selectedFolder === "all") return LOCAL_MATERIALS;
    return LOCAL_MATERIALS.filter((m) => m.folder === selectedFolder);
  }, [selectedFolder]);

  const duplicated = useMemo(() => {
    if (filtered.length === 0 || viewMode === "grid") return filtered;
    return [...filtered, ...filtered, ...filtered, ...filtered];
  }, [filtered, viewMode]);

  const startAnimation = useCallback(async () => {
    if (viewMode === "grid" || duplicated.length === 0) return;
    const el = trackRef.current;
    if (!el) return;
    const moveDistance = el.scrollWidth / 4;

    await controls.start({
      x: [-moveDistance, 0],
      transition: { x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 40 } },
    });
  }, [controls, duplicated.length, viewMode]);

  useEffect(() => {
    controls.stop();
    startAnimation();
  }, [selectedFolder, viewMode, startAnimation, controls]);

  return (
    <section id="materiales" className="py-24 bg-[#F8F7F4] overflow-hidden relative">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="border-l-4 border-[#BB9E7A] pl-8">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic font-serif text-[#524F4A] leading-[0.8]">
              Texturas <br /> <span className="text-[#BB9E7A] not-italic">& Acabados</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
              <button onClick={() => setViewMode("carousel")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${viewMode === "carousel" ? "bg-[#524F4A] text-white" : "text-slate-400"}`}><InfinityIcon size={14} /> Carrusel</button>
              <button onClick={() => setViewMode("grid")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${viewMode === "grid" ? "bg-[#524F4A] text-white" : "text-slate-400"}`}><LayoutGrid size={14} /> Ver Todo</button>
            </div>
            <select value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)} className="bg-white border-2 border-slate-100 text-[#524F4A] font-bold text-[11px] uppercase tracking-widest px-6 py-4 rounded-2xl outline-none focus:border-[#BB9E7A]">
              <option value="all">Todas las carpetas</option>
              {folders.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {viewMode === "carousel" ? (
            <motion.div key="carousel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div ref={trackRef} animate={controls} className="flex gap-8 px-4">
                {duplicated.map((item, idx) => (
                  <MaterialCard key={`carousel-${item.id}-${idx}`} item={item} />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="grid" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filtered.map((item) => <MaterialCard key={`grid-${item.id}`} item={item} isGrid />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function MaterialCard({ item, isGrid = false }: { item: any; isGrid?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div layout whileHover={{ y: -10 }} className={`relative flex-shrink-0 group cursor-pointer overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-sm transition-all ${isGrid ? "w-full aspect-[4/5]" : "w-[280px] md:w-[350px] aspect-[4/5]"}`}>
          <img src={item.resolvedSrc} alt={item.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <Badge className="bg-[#BB9E7A] text-white border-none mb-3 text-[9px] uppercase tracking-[0.2em] font-bold">{item.folder}</Badge>
            <h4 className="text-white text-2xl md:text-3xl font-serif italic leading-tight">{item.name}</h4>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-6xl w-[95vw] md:w-[90vw] p-0 overflow-hidden border-none bg-white rounded-[2.5rem] shadow-2xl [&>button]:hidden">
        <DialogClose className="absolute right-6 top-6 z-50 p-3 bg-white/20 hover:bg-white text-white hover:text-[#524F4A] rounded-full transition-all duration-300 backdrop-blur-xl border border-white/30 shadow-xl"><X size={20} /></DialogClose>
        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto md:overflow-hidden">
          <div className="w-full md:w-1/2 h-[300px] md:h-auto relative"><img src={item.resolvedSrc} className="w-full h-full object-cover" alt={item.name} /></div>
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
            <span className="text-[#BB9E7A] text-xs font-black uppercase tracking-[0.4em] mb-4 block">Catálogo Exclusivo</span>
            <h3 className="text-4xl md:text-7xl font-serif italic text-[#524F4A] mb-2 leading-[0.9] tracking-tighter">{item.name}</h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-[#BB9E7A]" /><p className="text-[#BB9E7A] font-medium text-sm tracking-widest uppercase">Ref. {item.ref}</p>
            </div>
            <div className="space-y-5">
              <DataRow label="Acabado" value={item.finish} />
              <DataRow label="Colección" value={item.folder} />
              <DataRow label="Formato" value="1.22 x 2.80 m" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-end border-b border-slate-100 pb-2 group">
      <span className="text-slate-400 text-[9px] uppercase font-black tracking-widest group-hover:text-[#BB9E7A] transition-colors">{label}</span>
      <span className="text-[#524F4A] font-bold text-base italic">{value}</span>
    </div>
  );
}