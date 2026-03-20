import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Verificar la sesión actual de Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // 2. Escuchar cambios de estado (si el user hace logout o login)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Mientras verifica el estado de la sesión, mostramos un pequeño loader
  // Esto evita enviar al usuario al /login mientras carga
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Si definitivamente no hay sesión, protegemos la ruta mandándolo al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si hay sesión y está logueado, le mostramos la página de Administración
  return <>{children}</>;
};
