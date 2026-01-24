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
  Download,
  LayoutGrid,
  Infinity as InfinityIcon,
} from "lucide-react";

const LOCAL_MATERIALS = [
  // --- COLOR ENTERO ---
  {
    id: 1,
    name: "Blanco",
    folder: "Color Entero",
    src: "src\\assets\\highi gloss\\entero\\blanco-entero.jpg",
    ref: "JC007",
    finish: "MT / HG",
  },
  {
    id: 2,
    name: "Carbon",
    folder: "Color Entero",
    src: "src\\assets\\highi gloss\\entero\\carbon-entero.jpg",
    ref: "JC381",
    finish: "MT / HG",
  },
  {
    id: 3,
    name: "Celeste",
    folder: "Color Entero",
    src: "src\\assets\\highi gloss\\entero\\celeste-entero.jpg",
    ref: "JC829",
    finish: "MT / HG",
  },
  {
    id: 4,
    name: "Mocaccino",
    folder: "Color Entero",
    src: "src\\assets\\highi gloss\\entero\\mocaccino-entero.jpg",
    ref: "JC204",
    finish: "MT / HG",
  },
  {
    id: 5,
    name: "Negro",
    folder: "Color Entero",
    src: "src\\assets\\highi gloss\\entero\\negro-entero.jpg",
    ref: "JC006",
    finish: "MT / HG",
  },
  {
    id: 6,
    name: "Plomo",
    folder: "Color Entero",
    src: "src\\assets\\highi gloss\\entero\\plomo-entero.jpg",
    ref: "JC209",
    finish: "MT / HG",
  },
  {
    id: 7,
    name: "Rojo",
    folder: "Color Entero",
    src: "src\\assets\\highi gloss\\entero\\rojo-entero.jpg",
    ref: "JC010",
    finish: "MT / HG",
  },
  {
    id: 8,
    name: "Rosado",
    folder: "Color Entero",
    src: "src\\assets\\highi gloss\\entero\\rosado-entero.jpg",
    ref: "JC052",
    finish: "MT / HG",
  },
  {
    id: 9,
    name: "Taupe",
    folder: "Color Entero",
    src: "src\\assets\\highi gloss\\entero\\taupe-entero.jpg",
    ref: "JC858",
    finish: "MT / HG",
  },
  {
    id: 10,
    name: "Verde",
    folder: "Color Entero",
    src: "src\\assets\\highi gloss\\entero\\verde-entero.jpg",
    ref: "JC825",
    finish: "MT / HG",
  },

  // --- MÁRMOL ---
  {
    id: 11,
    name: "Mármol Amazonic",
    folder: "Mármol",
    src: "src\\assets\\highi gloss\\marmol\\amazonic-marmol.jpg",
    ref: "JC1210",
    finish: "MT / HG",
  },
  {
    id: 12,
    name: "Calacatta Mármol",
    folder: "Mármol",
    src: "src\\assets\\highi gloss\\marmol\\calacatta-marmol.jpg",
    ref: "JC984",
    finish: "MT / HG",
  },
  {
    id: 13,
    name: "Calacatta Negro",
    folder: "Mármol",
    src: "src\\assets\\highi gloss\\marmol\\calatta negro-marmol.jpg",
    ref: "JC766",
    finish: "MT / HG",
  },
  {
    id: 14,
    name: "Calacatta White",
    folder: "Mármol",
    src: "src\\assets\\highi gloss\\marmol\\calatta white-marmol.jpg",
    ref: "JC945",
    finish: "MT / HG",
  },
  {
    id: 15,
    name: "Calacatta Exotic",
    folder: "Mármol",
    src: "src\\assets\\highi gloss\\marmol\\calcatta exotic-marmol.jpg",
    ref: "JC774",
    finish: "MT / HG",
  },
  {
    id: 16,
    name: "Mármol Gris",
    folder: "Mármol",
    src: "src\\assets\\highi gloss\\marmol\\gris-marmol.jpg",
    ref: "JC1184",
    finish: "MT / HG",
  },
  {
    id: 17,
    name: "Mármol Oro",
    folder: "Mármol",
    src: "src\\assets\\highi gloss\\marmol\\oro-marmol.jpg",
    ref: "JC1183",
    finish: "MT / HG",
  },
  {
    id: 18,
    name: "Mármol Oscuro",
    folder: "Mármol",
    src: "src\\assets\\highi gloss\\marmol\\oscuro-marmol.jpg",
    ref: "JC1008",
    finish: "MT / HG",
  },
  // --- AMADERADO ---
  {
    id: 19,
    name: "Sebra JC104",
    folder: "Amaderado",
    src: "src\\assets\\highi gloss\\amaderado\\sebra-amaderado.jpg",
    ref: "JC104",
    finish: "MT",
  },
  {
    id: 20,
    name: "Caramelo JC604",
    folder: "Amaderado",
    src: "src\\assets\\highi gloss\\amaderado\\caramelo-amaderado.jpg",
    ref: "JC604",
    finish: "MT",
  },

  // --- HOLOGRÁFICO ---
  {
    id: 21,
    name: "Gris Holográfico",
    folder: "Holográfico",
    src: "src\\assets\\highi gloss\\holografico\\gris-holografico.jpg",
    ref: "JC040D",
    finish: "MT / HG",
  },
  {
    id: 22,
    name: "Blanco Holográfico",
    folder: "Holográfico",
    src: "src\\assets\\highi gloss\\holografico\\blanco-holografico.jpg",
    ref: "JC143D",
    finish: "MT / HG",
  },
  {
    id: 23,
    name: "Beige Holográfico",
    folder: "Holográfico",
    src: "src\\assets\\highi gloss\\holografico\\beige-holografico.jpg",
    ref: "JC857D",
    finish: "MT / HG",
  },
  {
    id: 24,
    name: "Dorado Holográfico",
    folder: "Holográfico",
    src: "src\\assets\\highi gloss\\holografico\\dorado-holografico.jpg",
    ref: "JC332D",
    finish: "HG",
  },

  // --- PREMIUM ---
 
{ 
  id: 25, 
  name: "Blanco Premium", 
  folder: "Premium", 
  src: "src\\assets\\highi gloss\\premiun\\blanco-premiun.jpg", 
  ref: "JC63004", 
  finish: "MT / HG" 
}, 
{ 
  id: 26, 
  name: "Capri Premium", 
  folder: "Premium", 
  src: "src\\assets\\highi gloss\\premiun\\capri-premiun.jpg", 
  ref: "JC63022", 
  finish: "MT / HG" 
}, 
{ 
  id: 27, 
  name: "Gris Premium", 
  folder: "Premium", 
  src: "src\\assets\\highi gloss\\premiun\\gris-premiun.jpg", 
  ref: "JC63033", 
  finish: "MT / HG" 
}
];

export default function MaterialCatalog() {
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const trackRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const folders = useMemo(
    () => Array.from(new Set(LOCAL_MATERIALS.map((m) => m.folder))),
    [],
  );

  const filtered = useMemo(() => {
    if (selectedFolder === "all") return LOCAL_MATERIALS;
    return LOCAL_MATERIALS.filter((m) => m.folder === selectedFolder);
  }, [selectedFolder]);

  // Duplicación para carrusel infinito (ahora de Izquierda a Derecha)
  const duplicated = useMemo(() => {
    if (filtered.length === 0 || viewMode === "grid") return filtered;
    return [...filtered, ...filtered, ...filtered, ...filtered];
  }, [filtered, viewMode]);

  // Lógica de Animación (Izquierda a Derecha: Valores de X positivos)
  const startAnimation = useCallback(async () => {
    if (viewMode === "grid" || duplicated.length === 0) return;
    const el = trackRef.current;
    if (!el) return;

    const moveDistance = el.scrollWidth / 4;

    await controls.start({
      x: [-moveDistance, 0], // Inicia desde la izquierda negativa hacia el 0
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 40,
        },
      },
    });
  }, [controls, duplicated.length, viewMode]);

  useEffect(() => {
    controls.stop();
    startAnimation();
  }, [selectedFolder, viewMode, startAnimation, controls]);

  return (
    <section
      id="materiales"
      className="py-24 bg-[#F8F7F4] overflow-hidden relative"
    >
      {/* Decoración de fondo sutil */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#BB9E7A]/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="border-l-4 border-[#BB9E7A] pl-8">
            <div className="flex items-center gap-2 mb-3">
              <Box className="text-[#BB9E7A]" size={18} />
              <span className="text-[#BB9E7A] text-xs font-black uppercase tracking-[0.5em]">
                Jastel High Gloss
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic font-serif text-[#524F4A] leading-[0.8]">
              Texturas <br />{" "}
              <span className="text-[#BB9E7A] not-italic">& Acabados</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Toggle Vista */}
            <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setViewMode("carousel")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${viewMode === "carousel" ? "bg-[#524F4A] text-white" : "text-slate-400 hover:text-[#524F4A]"}`}
              >
                <InfinityIcon size={14} /> Carrusel
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${viewMode === "grid" ? "bg-[#524F4A] text-white" : "text-slate-400 hover:text-[#524F4A]"}`}
              >
                <LayoutGrid size={14} /> Ver Todo
              </button>
            </div>

            {/* Filtro */}
            <div className="relative w-full sm:w-64">
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="w-full appearance-none bg-white border-2 border-slate-100 text-[#524F4A] font-bold text-[11px] uppercase tracking-widest px-6 py-4 rounded-2xl cursor-pointer outline-none focus:border-[#BB9E7A] transition-all shadow-sm"
              >
                <option value="all">Todas las carpetas</option>
                {folders.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#BB9E7A] pointer-events-none"
                size={16}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {viewMode === "carousel" ? (
            <motion.div
              key="carousel-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <motion.div
                ref={trackRef}
                animate={controls}
                className="flex gap-8 px-4"
              >
                {duplicated.map((item, idx) => (
                  <MaterialCard
                    key={`carousel-${item.id}-${idx}`}
                    item={item}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="grid-mode"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filtered.map((item) => (
                <MaterialCard key={`grid-${item.id}`} item={item} isGrid />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Sub-componente Card para mantener el código limpio
function MaterialCard({
  item,
  isGrid = false,
}: {
  item: any;
  isGrid?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -10 }}
          className={`relative flex-shrink-0 group cursor-pointer overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 shadow-md transition-all
            ${isGrid ? "w-full aspect-[4/5]" : "w-[280px] md:w-[350px] aspect-[4/5]"}
          `}
        >
          <img
            src={item.src}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#524F4A]/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <Badge className="bg-[#BB9E7A]/20 text-[#BB9E7A] border-none mb-3 backdrop-blur-md text-[9px] uppercase tracking-widest font-bold">
              {item.folder}
            </Badge>
            <h4 className="text-white text-2xl font-serif italic leading-none">
              {item.name}
            </h4>
            <div className="h-[2px] w-0 bg-[#BB9E7A] mt-4 group-hover:w-12 transition-all duration-500" />
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-5xl w-[94vw] bg-white rounded-[2rem] md:rounded-[4rem] p-0 overflow-hidden border-none shadow-[0_0_100px_rgba(0,0,0,0.1)]">
        <DialogClose className="absolute right-8 top-8 z-50 p-3 bg-white/80 hover:bg-[#BB9E7A] hover:text-white rounded-full transition-all shadow-xl backdrop-blur-md">
          <X size={24} />
        </DialogClose>

        <div className="flex flex-col md:grid md:grid-cols-2">
          <div className="h-[350px] md:h-[700px] overflow-hidden">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              src={item.src}
              className="w-full h-full object-cover"
              alt={item.name}
            />
          </div>

          <div className="p-12 md:p-20 flex flex-col justify-center relative bg-white">
            <Badge className="w-fit bg-[#BB9E7A] text-white mb-8 uppercase tracking-[0.3em] text-[10px] px-6 py-2 rounded-full border-none shadow-lg shadow-[#BB9E7A]/20">
              Colección {item.folder}
            </Badge>

            <h3 className="text-5xl md:text-7xl font-serif italic text-[#524F4A] mb-4 leading-[0.9] tracking-tighter">
              {item.name}
            </h3>
            <p className="text-[#BB9E7A] font-black text-xs uppercase tracking-widest mb-10 border-b border-slate-100 pb-6">
              Ref ID: {item.ref}
            </p>

            <div className="grid grid-cols-1 gap-6 mb-12">
              <DataRow label="Formato Panel" value="1.22 x 2.80 m" />
              <DataRow label="Grosor Núcleo" value="18 mm" />
              <DataRow label="Acabado Final" value={item.finish} />
              <DataRow label="Resistencia" value="Alta Tensión / Rayado" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center group">
      <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">
        {label}
      </span>
      <span className="text-[#524F4A] font-bold text-sm italic group-hover:text-[#BB9E7A] transition-colors">
        {value}
      </span>
    </div>
  );
}
