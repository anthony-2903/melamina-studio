import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { Grid, Presentation, Layers, Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [totalPortfolios, setTotalPortfolios] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [activities, setActivities] = useState<{title: string, date: string}[]>([]);

  useEffect(() => {
    fetchRealData();
  }, []);

  const fetchRealData = async () => {
    try {
      // 1. Obtener conteo de categorías
      const { count: catCount } = await supabase.from("categories").select("*", { count: "exact", head: true });
      setTotalCategories(catCount || 0);

      // 2. Obtener proyectos ordenados por fecha
      const { data: portfolios } = await supabase.from("portfolios").select("created_at, title").order("created_at", { ascending: false });
      
      if (portfolios) {
        setTotalPortfolios(portfolios.length);

        // Feed de actividad: Extraer los últimos 4
        const latest = portfolios.slice(0, 4).map(p => ({
          title: p.title,
          date: new Date(p.created_at).toLocaleDateString("es-ES", { day: 'numeric', month: 'short' })
        }));
        setActivities(latest);
      }
    } catch (e) {
      console.error("Error obteniendo datos del dashboard", e);
    }
  };

  return (
    <div className="space-y-8">
      {/* TARJETAS ESTADÍSTICAS REALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Proyectos" value={totalPortfolios.toString()} icon={<Presentation size={20} />} />
        <StatCard title="Categorías" value={totalCategories.toString()} icon={<Grid size={20} />} />
        <StatCard title="Materiales Catálogo" value="38" icon={<Layers size={20} />} trend="Fijos" />
        <StatCard title="Analíticas de Visitas" value="--" icon={<Activity size={20} />} trend="Pte. Vercel" />
      </div>

      {/* ACTIVIDAD RECIENTE */}
      <div className="bg-[#524F4A] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-[#524F4A]/20 flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] pointer-events-none" />
          <h3 className="text-xl font-serif italic mb-6 font-bold text-[#BB9E7A]">Recién Agregados</h3>
          <div className="flex-1 space-y-6">
            {activities.length > 0 ? (
              activities.map((act) => (
                <ActivityItem key={`${act.date}-${act.title}`} time={act.date} title={`Proyecto: ${act.title}`} />
              ))
            ) : (
              <p className="text-sm text-white/50 italic">No hay actividad reciente.</p>
            )}
          </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend?: string }) {
  return (
    <m.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-[#DBD8D3]/30 rounded-2xl flex items-center justify-center text-[#524F4A] group-hover:bg-[#BB9E7A] group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {trend}
          </div>
        )}
      </div>
      <div>
        <h4 className="text-[#524F4A] text-3xl font-bold tracking-tighter mb-1 font-serif italic">{value}</h4>
        <p className="text-xs uppercase tracking-widest font-bold text-slate-400">{title}</p>
      </div>
    </m.div>
  );
}

function ActivityItem({ time, title }: { time: string, title: string }) {
  return (
    <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[#BB9E7A] before:rounded-full after:absolute after:left-[3px] after:top-5 after:w-[2px] after:h-full after:bg-white/10 last:after:hidden">
      <p className="text-[10px] uppercase tracking-widest text-[#DBD8D3]/70 font-bold mb-1">{time}</p>
      <p className="text-sm text-white font-medium leading-tight">{title}</p>
    </div>
  );
}
