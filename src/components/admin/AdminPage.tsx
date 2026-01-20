"use client";

import { useEffect, useState } from "react";
import { 
  User, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  LayoutGrid, 
  FolderTree, 
  Settings,
  Bell,
  
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLogin from "./AdminLogin";
import AdminPortfolio from "./AdminPortfolio";
import AdminCategory from "./AdminCategory";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState<"portfolio" | "categories">("portfolio");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setIsLoggedIn(true);
    });
  }, []);

  if (!mounted) return null;

  const handleLoginSuccess = () => setIsLoggedIn(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#DBD8D3]/10 flex overflow-hidden font-sans">
      {!isLoggedIn ? (
        <div className="w-full flex items-center justify-center bg-[#DBD8D3]/20">
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <>
          {/* SIDEBAR ARQUITECTÓNICO */}
          <AnimatePresence mode="wait">
            {sidebarVisible && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-72 bg-[#524F4A] text-white flex flex-col z-40 relative shadow-[10px_0_40px_rgba(0,0,0,0.1)]"
              >
                {/* Header Sidebar */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-10">
                    <h2 className="text-xl font-bold tracking-tighter italic font-serif">
                      husheniid <span className="text-[#BB9E7A]">.</span>
                    </h2>
                    <button 
                      onClick={() => setSidebarVisible(false)}
                      className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-[#DBD8D3]/50 hover:text-[#BB9E7A]"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  </div>

                  {/* Perfil Mini */}
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-[1.5rem] mb-10 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-[#BB9E7A] flex items-center justify-center shadow-lg shadow-[#BB9E7A]/20">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold tracking-tight">Autor Principal</p>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <p className="text-[9px] text-[#DBD8D3]/50 uppercase tracking-[0.2em]">En línea</p>
                      </div>
                    </div>
                  </div>

                  {/* Navegación */}
                  <nav className="space-y-3">
                    <p className="text-[10px] font-bold text-[#DBD8D3]/30 uppercase tracking-[0.3em] mb-4 ml-2">Menú de Gestión</p>
                    
                    <button
                      onClick={() => setTab("portfolio")}
                      className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-500 group ${
                        tab === "portfolio" 
                        ? "bg-[#BB9E7A] text-white shadow-xl shadow-[#BB9E7A]/20" 
                        : "text-[#DBD8D3]/60 hover:bg-white/5 hover:text-[#BB9E7A]"
                      }`}
                    >
                      <LayoutGrid size={18} className={tab === "portfolio" ? "text-white" : "group-hover:scale-110 transition-transform"} />
                      <span className="text-sm font-bold tracking-tight">Galería Proyectos</span>
                    </button>

                    <button
                      onClick={() => setTab("categories")}
                      className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-500 group ${
                        tab === "categories" 
                        ? "bg-[#BB9E7A] text-white shadow-xl shadow-[#BB9E7A]/20" 
                        : "text-[#DBD8D3]/60 hover:bg-white/5 hover:text-[#BB9E7A]"
                      }`}
                    >
                      <FolderTree size={18} className={tab === "categories" ? "text-white" : "group-hover:scale-110 transition-transform"} />
                      <span className="text-sm font-bold tracking-tight">Categorías</span>
                    </button>
                  </nav>
                </div>

                {/* Footer Sidebar */}
                <div className="mt-auto p-8 border-t border-white/5">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-xs uppercase tracking-[0.2em]"
                  >
                    <LogOut size={18} />
                    Cerrar Sesión
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#DBD8D3]/10">
            {/* TOP BAR */}
            <header className="h-20 bg-white border-b border-[#DBD8D3]/30 px-10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                {!sidebarVisible && (
                  <button
                    onClick={() => setSidebarVisible(true)}
                    className="p-2.5 bg-[#524F4A] text-white rounded-xl shadow-lg hover:bg-[#BB9E7A] transition-all duration-300"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold text-[#524F4A] tracking-tighter">
                    {tab === "portfolio" ? "Gestión de Portafolio" : "Gestión de Categorías"}
                  </h1>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Estudio de Diseño e Interiorismo</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <button className="p-2.5 text-slate-400 hover:text-[#BB9E7A] transition-colors relative group">
                  <Bell size={22} strokeWidth={1.5} />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#BB9E7A] rounded-full border-2 border-white group-hover:scale-125 transition-transform"></span>
                </button>
                
                <div className="h-8 w-[1px] bg-[#DBD8D3]/50" />
                
                <Button variant="outline" className="rounded-2xl border-[#DBD8D3] gap-2 font-bold text-[10px] uppercase tracking-widest hover:bg-[#524F4A] hover:text-white transition-all duration-300 px-6 h-11">
                  <Settings size={16} />
                  Ajustes
                </Button>
              </div>
            </header>

            {/* CONTENT SCROLL AREA */}
            <div className="flex-1 overflow-y-auto p-10 bg-transparent">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto"
              >
                {/* Banner de Bienvenida o Contexto */}
                <div className="mb-10 p-8 rounded-[2rem] bg-gradient-to-r from-[#524F4A] to-[#6a6660] text-white relative overflow-hidden shadow-2xl shadow-[#524F4A]/10">
                   <div className="relative z-10">
                      <h3 className="text-2xl font-bold font-serif italic mb-1">Agregar Proyecto</h3>
                   </div>
                </div>

                {tab === "portfolio" ? <AdminPortfolio /> : <AdminCategory />}
              </motion.div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default AdminPage;