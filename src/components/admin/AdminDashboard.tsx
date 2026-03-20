import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Grid, Presentation, Layers, Activity } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [totalPortfolios, setTotalPortfolios] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [activities, setActivities] = useState<{title: string, date: string}[]>([]);
  const [chartData, setChartData] = useState<{name: string, proyectos: number}[]>([]);

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

        // Agrupar proyectos por mes para el gráfico
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        const grouped = new Map();
        
        portfolios.forEach(p => {
          const d = new Date(p.created_at);
          const m = months[d.getMonth()];
          grouped.set(m, (grouped.get(m) || 0) + 1);
        });

        const today = new Date();
        const newChartData = [];
        // Sacar los últimos 6 meses dinámicamente
        for (let i = 5; i >= 0; i--) {
          const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
          const monthName = months[d.getMonth()];
          newChartData.push({ 
            name: monthName, 
            proyectos: grouped.get(monthName) || 0 
          });
        }
        setChartData(newChartData);
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

      {/* GRÁFICO Y ACTIVIDAD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <h3 className="text-xl font-serif italic text-[#524F4A] mb-8 font-bold">Proyectos añadidos (6 meses)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProyectos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#BB9E7A" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#BB9E7A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} dy={10} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: "1rem", border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  itemStyle={{ color: "#524F4A", fontWeight: "bold" }}
                />
                <Area type="monotone" dataKey="proyectos" stroke="#BB9E7A" strokeWidth={3} fillOpacity={1} fill="url(#colorProyectos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#524F4A] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-[#524F4A]/20 flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] pointer-events-none" />
          <h3 className="text-xl font-serif italic mb-6 font-bold text-[#BB9E7A]">Recién Agregados</h3>
          <div className="flex-1 space-y-6">
            {activities.length > 0 ? (
              activities.map((act, i) => (
                <ActivityItem key={i} time={act.date} title={`Proyecto: ${act.title}`} />
              ))
            ) : (
              <p className="text-sm text-white/50 italic">No hay actividad reciente.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend?: string }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
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
    </motion.div>
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
