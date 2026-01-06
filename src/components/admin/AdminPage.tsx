"use client";

import { useEffect, useState } from "react";
import { User, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import AdminLogin from "./AdminLogin";
import AdminPortfolio from "./AdminPortfolio";
import AdminCategory from "./AdminCategory";
import { supabase } from "@/lib/supabaseClient";

const AdminPage = () => {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState<"portfolio" | "categories">("portfolio");
  const [sidebarVisible, setSidebarVisible] = useState(true);

 useEffect(() => {
  setMounted(true);

  supabase.auth.getSession().then(({ data }) => {
    if (data.session) {
      setIsLoggedIn(true);
    }
  });
}, []);


  


  if (!mounted) return null;

  const handleLoginSuccess = () => {
    localStorage.setItem("adminLogged", "true");
    setIsLoggedIn(true);
  };

 const handleLogout = async () => {
  await supabase.auth.signOut();
  setIsLoggedIn(false);
  window.location.href = "/";
};


  return (
    <div className="min-h-screen bg-muted relative">
      <div className="container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <AdminLogin onLoginSuccess={handleLoginSuccess} />
          </div>
        ) : (
          <div className="flex gap-6 relative">
            {/* SIDEBAR */}
            <motion.aside
              animate={{
                width: sidebarVisible ? 260 : 0,
                opacity: sidebarVisible ? 1 : 0,
              }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden bg-orange-100 rounded-lg shadow"
            >
              <div className="p-4 h-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <h3 className="font-bold">Administrador</h3>
                  </div>

                  <button onClick={() => setSidebarVisible(false)}>
                    <ChevronLeft />
                  </button>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setTab("portfolio")}
                    className={`w-full text-left px-3 py-2 rounded ${
                      tab === "portfolio" ? "bg-orange-200" : ""
                    }`}
                  >
                    Portafolio
                  </button>

                  <button
                    onClick={() => setTab("categories")}
                    className={`w-full text-left px-3 py-2 rounded ${
                      tab === "categories" ? "bg-orange-200" : ""
                    }`}
                  >
                    Categorías
                  </button>
                </nav>
              </div>
            </motion.aside>

            {/* BOTÓN REABRIR SIDEBAR */}
            {!sidebarVisible && (
              <button
                onClick={() => setSidebarVisible(true)}
                className="fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-orange-500 text-white p-2 rounded-full shadow"
              >
                <ChevronRight />
              </button>
            )}

            {/* MAIN */}
            <main className="flex-1">
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-600 text-white rounded flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>

              {tab === "portfolio" ? <AdminPortfolio /> : <AdminCategory />}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
