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
  Bell
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
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {!isLoggedIn ? (
        <div className="w-full flex items-center justify-center bg-slate-50">
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <>
          {/* SIDEBAR MODERNO */}
          <AnimatePresence mode="wait">
            {sidebarVisible && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-72 bg-slate-950 text-white flex flex-col z-40 relative shadow-2xl"
              >
                {/* Header Sidebar */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-10">
                    <h2 className="text-xl font-bold tracking-tighter italic">
                      estudio <span className="text-orange-500">h.</span>
                    </h2>
                    <button 
                      onClick={() => setSidebarVisible(false)}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  </div>

                  {/* Perfil Mini */}
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl mb-8 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/20">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Administrador</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Panel de Control</p>
                    </div>
                  </div>

                  {/* Navegación */}
                  <nav className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Gestión</p>
                    
                    <button
                      onClick={() => setTab("portfolio")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        tab === "portfolio" 
                        ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <LayoutGrid size={18} />
                      <span className="text-sm font-semibold">Portafolio</span>
                    </button>

                    <button
                      onClick={() => setTab("categories")}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        tab === "categories" 
                        ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <FolderTree size={18} />
                      <span className="text-sm font-semibold">Categorías</span>
                    </button>
                  </nav>
                </div>

                {/* Footer Sidebar */}
                <div className="mt-auto p-8">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-semibold text-sm"
                  >
                    <LogOut size={18} />
                    Cerrar Sesión
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 flex flex-col h-screen overflow-hidden">
            {/* TOP BAR */}
            <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {!sidebarVisible && (
                  <button
                    onClick={() => setSidebarVisible(true)}
                    className="p-2 bg-slate-950 text-white rounded-xl shadow-lg hover:bg-orange-600 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
                <div>
                  <h1 className="text-xl font-bold text-slate-900 capitalize">
                    {tab === "portfolio" ? "Gestión de Portafolio" : "Gestión de Categorías"}
                  </h1>
                  <p className="text-xs text-slate-400">Panel de administración v2.0</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-orange-600 rounded-full border-2 border-white"></span>
                </button>
                <div className="h-8 w-[1px] bg-slate-200 mx-2" />
                <Button variant="outline" className="rounded-xl border-slate-200 gap-2 font-bold text-xs uppercase tracking-widest">
                  <Settings size={16} />
                  Ajustes
                </Button>
              </div>
            </header>

            {/* CONTENT SCROLL AREA */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-7xl mx-auto"
              >
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