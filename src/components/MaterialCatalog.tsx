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
  LayoutGrid,
  Infinity as InfinityIcon,
} from "lucide-react";

// --- MOTOR DE IMÁGENES RECURSIVO ---
const ASSET_IMAGES = import.meta.glob("/src/assets/**/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

const resolveImagePath = (originalPath: string) => {
  const normalizedSearch = originalPath.replace(/\\/g, "/").toLowerCase();
  const foundPath = Object.keys(ASSET_IMAGES).find((key) => 
    key.toLowerCase().includes(normalizedSearch) || 
    normalizedSearch.includes(key.toLowerCase().replace("/src/assets/", ""))
  );
  return foundPath ? (ASSET_IMAGES[foundPath] as string) : "";
};

// --- DATOS HIGH GLOSS ---
const RAW_HIGH_GLOSS = [
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
  { id: 11, name: "Mármol Amazonic", folder: "Mármol", src: "highi gloss/marmol/amazonic-marmol.jpg", ref: "JC1210", finish: "MT / HG" },
  { id: 12, name: "Calacatta Mármol", folder: "Mármol", src: "highi gloss/marmol/calacatta-marmol.jpg", ref: "JC984", finish: "MT / HG" },
  { id: 13, name: "Calacatta Negro", folder: "Mármol", src: "highi gloss/marmol/calatta negro-marmol.jpg", ref: "JC766", finish: "MT / HG" },
  { id: 14, name: "Calacatta White", folder: "Mármol", src: "highi gloss/marmol/calatta white-marmol.jpg", ref: "JC945", finish: "MT / HG" },
  { id: 15, name: "Calacatta Exotic", folder: "Mármol", src: "highi gloss/marmol/calcatta exotic-marmol.jpg", ref: "JC774", finish: "MT / HG" },
  { id: 16, name: "Mármol Gris", folder: "Mármol", src: "highi gloss/marmol/gris-marmol.jpg", ref: "JC1184", finish: "MT / HG" },
  { id: 17, name: "Mármol Oro", folder: "Mármol", src: "highi gloss/marmol/oro-marmol.jpg", ref: "JC1183", finish: "MT / HG" },
  { id: 18, name: "Mármol Oscuro", folder: "Mármol", src: "highi gloss/marmol/oscuro-marmol.jpg", ref: "JC1008", finish: "MT / HG" },
  { id: 19, name: "Sebra JC104", folder: "Amaderado", src: "highi gloss/amaderado/sebra-amaderado.jpg", ref: "JC104", finish: "MT" },
  { id: 20, name: "Caramelo JC604", folder: "Amaderado", src: "highi gloss/amaderado/caramelo-amaderado.jpg", ref: "JC604", finish: "MT" },
  { id: 21, name: "Gris Holográfico", folder: "Holográfico", src: "highi gloss/holografico/gris-holografico.jpg", ref: "JC040D", finish: "MT / HG" },
  { id: 22, name: "Blanco Holográfico", folder: "Holográfico", src: "highi gloss/holografico/blanco-holografico.jpg", ref: "JC143D", finish: "MT / HG" },
  { id: 23, name: "Beige Holográfico", folder: "Holográfico", src: "highi gloss/holografico/beige-holografico.jpg", ref: "JC857D", finish: "MT / HG" },
  { id: 24, name: "Dorado Holográfico", folder: "Holográfico", src: "highi gloss/holografico/dorado-holografico.jpg", ref: "JC332D", finish: "HG" },
  { id: 25, name: "Blanco Premium", folder: "Premium", src: "highi gloss/premiun/blanco-premiun.jpg", ref: "JC63004", finish: "MT / HG" },
  { id: 26, name: "Capri Premium", folder: "Premium", src: "highi gloss/premiun/capri-premiun.jpg", ref: "JC63022", finish: "MT / HG" },
  { id: 27, name: "Gris Premium", folder: "Premium", src: "highi gloss/premiun/gris-premiun.jpg", ref: "JC63033", finish: "MT / HG" }
];

// --- DATOS PELIKANO ---
const RAW_PELIKANO = [
  // ===== CUERO =====
  { id: 101, name: "Galápagos", folder: "cuero", src: "pelikano/cuero/galapagos-cuero.jpg", ref: "P-CU01", finish: "cuero" },
  { id: 102, name: "Mamba", folder: "cuero", src: "pelikano/cuero/mamba-cuero.jpg", ref: "P-CU02", finish: "cuero" },
  { id: 103, name: "Tívoli", folder: "cuero", src: "pelikano/cuero/tivoli-cuero.jpg", ref: "P-CU03", finish: "cuero" },
  { id: 104, name: "Toquilla", folder: "cuero", src: "pelikano/cuero/toquilla-cuero.jpg", ref: "P-CU04", finish: "cuero" },

  // ===== MATE =====
  { id: 201, name: "Arupo", folder: "mate", src: "pelikano/mate/arupo-mate.jpg", ref: "P-MA01", finish: "mate" },
  { id: 202, name: "Avellana", folder: "mate", src: "pelikano/mate/avellana-mate.jpg", ref: "P-MA02", finish: "mate" },
  { id: 203, name: "Burdeos", folder: "mate", src: "pelikano/mate/burdeos-mate.jpg", ref: "P-MA03", finish: "mate" },
  { id: 204, name: "Ceniza", folder: "mate", src: "pelikano/mate/ceniza-mate.jpg", ref: "P-MA04", finish: "mate" },
  { id: 205, name: "Manzano", folder: "mate", src: "pelikano/mate/manzano-mate.jpg", ref: "P-MA05", finish: "mate" },
  { id: 206, name: "Nazca", folder: "mate", src: "pelikano/mate/nazca-mate.jpg", ref: "P-MA06", finish: "mate" },
  { id: 207, name: "Rovere", folder: "mate", src: "pelikano/mate/rovere-mate.jpg", ref: "P-MA07", finish: "mate" },

  // ===== METAL =====
  { id: 301, name: "Ámbar", folder: "metal", src: "pelikano/metal/ambar-metal.jpg", ref: "P-ME01", finish: "metal" },
  { id: 302, name: "Inox", folder: "metal", src: "pelikano/metal/inox-metal.jpg", ref: "P-ME02", finish: "metal" },

  // ===== PORO =====
  { id: 401, name: "Caramelo", folder: "poro", src: "pelikano/poro/caramelo-poro.jpg", ref: "P-PO01", finish: "poro" },
  { id: 402, name: "Coñac", folder: "poro", src: "pelikano/poro/coñac-poro.jpg", ref: "P-PO02", finish: "poro" },
  { id: 403, name: "Duna", folder: "poro", src: "pelikano/poro/duna-poro.jpg", ref: "P-PO03", finish: "poro" },
  { id: 404, name: "Espresso", folder: "poro", src: "pelikano/poro/espresso-poro.jpg", ref: "P-PO04", finish: "poro" },
  { id: 405, name: "Gales", folder: "poro", src: "pelikano/poro/gales-poro.jpg", ref: "P-PO05", finish: "poro" },
  { id: 406, name: "Miel", folder: "poro", src: "pelikano/poro/miel-poro.jpg", ref: "P-PO06", finish: "poro" },
  { id: 407, name: "Niebla", folder: "poro", src: "pelikano/poro/niebla-poro.jpg", ref: "P-PO07", finish: "poro" },

  // ===== SYNCHRO =====
  { id: 501, name: "Bardolino", folder: "synchro", src: "pelikano/synchro/bardolino-synchro.jpg", ref: "P-SY01", finish: "synchro" },
  { id: 502, name: "Bellota", folder: "synchro", src: "pelikano/synchro/bellota-synchro.jpg", ref: "P-SY02", finish: "synchro" },
  { id: 503, name: "Cartagena", folder: "synchro", src: "pelikano/synchro/cartagena-synchro.jpg", ref: "P-SY03", finish: "synchro" },
  { id: 504, name: "Castaño", folder: "synchro", src: "pelikano/synchro/castaño-synchro.jpg", ref: "P-SY04", finish: "synchro" },
  { id: 505, name: "Fumé", folder: "synchro", src: "pelikano/synchro/fume-synchro.jpg", ref: "P-SY05", finish: "synchro" },
  { id: 506, name: "Macadamia", folder: "synchro", src: "pelikano/synchro/macadamia-synchro.jpg", ref: "P-SY06", finish: "synchro" },
  { id: 507, name: "Milan", folder: "synchro", src: "pelikano/synchro/milan-synchro.jpg", ref: "P-SY07", finish: "synchro" },
  { id: 508, name: "Nacar", folder: "synchro", src: "pelikano/synchro/nacar-synchro.jpg", ref: "P-SY08", finish: "synchro" },
  { id: 509, name: "Panela", folder: "synchro", src: "pelikano/synchro/panela-synchro.jpg", ref: "P-SY09", finish: "synchro" },
  { id: 510, name: "Positado", folder: "synchro", src: "pelikano/synchro/positado-synchro.jpg", ref: "P-SY10", finish: "synchro" },
  { id: 511, name: "Roble Negro", folder: "synchro", src: "pelikano/roble negro-roble.jpg", ref: "P-SY11", finish: "synchro" },
];


const LOCAL_HIGH_GLOSS = RAW_HIGH_GLOSS.map(m => ({ ...m, resolvedSrc: resolveImagePath(m.src) }));
const LOCAL_PELIKANO = RAW_PELIKANO.map(m => ({ ...m, resolvedSrc: resolveImagePath(m.src) }));

export default function MaterialCatalog() {
  // Estados HG
  const [hgFolder, setHgFolder] = useState("all");
  const [hgView, setHgView] = useState<"carousel" | "grid">("carousel");
  const trackRefHg = useRef<HTMLDivElement | null>(null);
  const controlsHg = useAnimation();

  // Estados PK
  const [pkFolder, setPkFolder] = useState("all");
  const [pkView, setPkView] = useState<"carousel" | "grid">("carousel");
  const trackRefPk = useRef<HTMLDivElement | null>(null);
  const controlsPk = useAnimation();

  // Lógica HG
  const hgFolders = useMemo(() => Array.from(new Set(LOCAL_HIGH_GLOSS.map(m => m.folder))), []);
  const hgFiltered = useMemo(() => hgFolder === "all" ? LOCAL_HIGH_GLOSS : LOCAL_HIGH_GLOSS.filter(m => m.folder === hgFolder), [hgFolder]);
  const hgDuplicated = useMemo(() => hgView === "grid" ? hgFiltered : [...hgFiltered, ...hgFiltered, ...hgFiltered, ...hgFiltered], [hgFiltered, hgView]);

  // Lógica PK (Corregida la referencia a pkFiltered)
  const pkFolders = useMemo(() => Array.from(new Set(LOCAL_PELIKANO.map(m => m.folder))), []);
  const pkFiltered = useMemo(() => pkFolder === "all" ? LOCAL_PELIKANO : LOCAL_PELIKANO.filter(m => m.folder === pkFolder), [pkFolder]);
  const pkDuplicated = useMemo(() => pkView === "grid" ? pkFiltered : [...pkFiltered, ...pkFiltered, ...pkFiltered, ...pkFiltered], [pkFiltered, pkView]);

  // Animaciones
  const startHgAnim = useCallback(async () => {
    if (hgView === "grid" || hgDuplicated.length === 0) return;
    const el = trackRefHg.current;
    if (!el) return;
    const moveDistance = el.scrollWidth / 4;
    await controlsHg.start({ x: [-moveDistance, 0], transition: { x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 40 } } });
  }, [hgDuplicated.length, hgView, controlsHg]);

  const startPkAnim = useCallback(async () => {
    if (pkView === "grid" || pkDuplicated.length === 0) return;
    const el = trackRefPk.current;
    if (!el) return;
    const moveDistance = el.scrollWidth / 4;
    await controlsPk.start({ x: [0, -moveDistance], transition: { x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 45 } } });
  }, [pkDuplicated.length, pkView, controlsPk]);

  useEffect(() => { controlsHg.stop(); startHgAnim(); }, [hgFolder, hgView, startHgAnim]);
  useEffect(() => { controlsPk.stop(); startPkAnim(); }, [pkFolder, pkView, startPkAnim]);

  return (
    <section id="materiales" className="py-24 bg-[#F8F7F4] overflow-hidden relative space-y-32">
      
      {/* SECCIÓN 1: HIGH GLOSS */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="border-l-4 border-[#BB9E7A] pl-8">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic font-serif text-[#524F4A] leading-[0.8]">
              High Gloss <br /> <span className="text-[#BB9E7A] not-italic">& Acabados</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
              <button onClick={() => setHgView("carousel")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${hgView === "carousel" ? "bg-[#524F4A] text-white" : "text-slate-400"}`}><InfinityIcon size={14} /> Carrusel</button>
              <button onClick={() => setHgView("grid")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${hgView === "grid" ? "bg-[#524F4A] text-white" : "text-slate-400"}`}><LayoutGrid size={14} /> Ver Todo</button>
            </div>
            <select value={hgFolder} onChange={(e) => setHgFolder(e.target.value)} className="bg-white border-2 border-slate-100 text-[#524F4A] font-bold text-[11px] uppercase tracking-widest px-6 py-4 rounded-2xl outline-none focus:border-[#BB9E7A]">
              <option value="all">Todas las carpetas</option>
              {hgFolders.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {hgView === "carousel" ? (
              <motion.div key="hg-car" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div ref={trackRefHg} animate={controlsHg} className="flex gap-8 px-4">
                  {hgDuplicated.map((item, idx) => <MaterialCard key={`hg-car-${item.id}-${idx}`} item={item} />)}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="hg-grid" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {hgFiltered.map((item) => <MaterialCard key={`hg-grid-${item.id}`} item={item} isGrid />)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* SECCIÓN 2: PELIKANO */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="border-l-4 border-[#524F4A] pl-8">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic font-serif text-[#BB9E7A] leading-[0.8]">
              Pelikano <br /> <span className="text-[#524F4A] not-italic">& Texturas</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
              <button onClick={() => setPkView("carousel")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${pkView === "carousel" ? "bg-[#524F4A] text-white" : "text-slate-400"}`}><InfinityIcon size={14} /> Carrusel</button>
              <button onClick={() => setPkView("grid")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${pkView === "grid" ? "bg-[#524F4A] text-white" : "text-slate-400"}`}><LayoutGrid size={14} /> Ver Todo</button>
            </div>
            <select value={pkFolder} onChange={(e) => setPkFolder(e.target.value)} className="bg-white border-2 border-slate-100 text-[#524F4A] font-bold text-[11px] uppercase tracking-widest px-6 py-4 rounded-2xl outline-none focus:border-[#BB9E7A]">
              <option value="all">Todas las texturas</option>
              {pkFolders.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {pkView === "carousel" ? (
              <motion.div key="pk-car" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div ref={trackRefPk} animate={controlsPk} className="flex gap-8 px-4">
                  {pkDuplicated.map((item, idx) => <MaterialCard key={`pk-car-${item.id}-${idx}`} item={item} />)}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key="pk-grid" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {pkFiltered.map((item) => <MaterialCard key={`pk-grid-${item.id}`} item={item} isGrid />)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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