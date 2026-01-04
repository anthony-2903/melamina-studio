"use client";

import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminPortfolio from "./AdminPortfolio";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        {isLoggedIn ? (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={handleLogout} className="px-3 py-2 bg-destructive text-white rounded">Cerrar sesión</button>
            </div>
            <AdminPortfolio />
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <AdminLogin onLoginSuccess={handleLoginSuccess} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
