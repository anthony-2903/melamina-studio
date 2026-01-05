"use client";

import { useEffect, useState } from "react";
import { User, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLogin from "./AdminLogin";
import AdminPortfolio from "./AdminPortfolio";
import AdminCategory from "./AdminCategory";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState<"portfolio" | "categories">("portfolio");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("adminLogged");
      if (stored === "true") setIsLoggedIn(true);
    } catch (e) {
      // ignore (SSR safety)
    }
  }, []);

  const handleLoginSuccess = () => {
    try {
      localStorage.setItem("adminLogged", "true");
    } catch (e) {}
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("adminLogged");
    } catch (e) {}
    setIsLoggedIn(false);
    if (typeof window !== "undefined") window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <AdminLogin onLoginSuccess={handleLoginSuccess} />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <motion.aside
              initial={false}
              animate={{ width: sidebarVisible ? "16rem" : "0rem", opacity: sidebarVisible ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden md:flex-shrink-0 md:block bg-orange-100 rounded-lg shadow"
              style={{ width: sidebarVisible ? "16rem" : "0rem" }}
            >
              <div className="p-4 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    <h3 className="font-bold">Administrador</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSidebarVisible(false)}
                      title="Ocultar sidebar"
                      className="p-1 rounded hover:bg-muted"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <nav className="space-y-2">
                  <button
                    onClick={() => setTab("categories")}
                    className={`w-full text-left px-3 py-2 rounded ${tab === "categories" ? "bg-orange-200 text-orange-900" : "hover:bg-orange-50"}`}
                  >
                    Categorías
                  </button>
                  <button
                    onClick={() => setTab("portfolio")}
                    className={`w-full text-left px-3 py-2 rounded ${tab === "portfolio" ? "bg-orange-200 text-orange-900" : "hover:bg-orange-50"}`}
                  >
                    Portafolio
                  </button>
                </nav>
              </div>
            </motion.aside>

            <main className="flex-1">
              <div className="flex items-center justify-between mb-4">
                {!sidebarVisible && (
                  <button onClick={() => setSidebarVisible(true)} title="Mostrar sidebar" className="px-2 py-1 rounded hover:bg-muted mr-2">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                <div className="flex-1" />
                <button onClick={handleLogout} title="Cerrar sesión" className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center shadow">
                  <LogOut className="w-4 h-4 mr-2" />Cerrar sesión
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
