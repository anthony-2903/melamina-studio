"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  onLoginSuccess: () => void;
};

const AdminLogin = ({ onLoginSuccess }: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Acceso denegado",
        description: "Las credenciales no coinciden con nuestros registros.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Autenticación exitosa",
        description: "Bienvenido al panel de control de Husheniid.",
        className: "bg-slate-900 text-white border-none",
      });
      onLoginSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fafafa] relative overflow-hidden">
      {/* Elementos Decorativos de Fondo */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10 px-4"
      >
        {/* BOTÓN VOLVER */}
        <Button
          variant="ghost"
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors group p-0"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver a la web principal
        </Button>

        {/* CONTENEDOR DEL FORMULARIO */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/60 p-10 md:p-12 relative">
          
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-950/20">
              <ShieldCheck size={32} />
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Panel Administrativo</h2>
            <p className="text-slate-500 mt-2">Introduce tus credenciales para gestionar el estudio.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* EMAIL */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="admin@husheniid.com"
                  className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-orange-600 transition-all text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Contraseña
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-orange-600 transition-all text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* BOTÓN SUBMIT */}
            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl bg-slate-950 hover:bg-orange-600 text-white font-bold text-lg transition-all duration-300 shadow-lg shadow-slate-950/10 active:scale-[0.98]" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Verificando...
                </div>
              ) : (
                "Acceder al Panel"
              )}
            </Button>
          </form>

          {/* FOOTER DEL FORM */}
          <p className="text-center text-slate-400 text-sm mt-8">
            Husheniid &copy; {new Date().getFullYear()} — Acceso Restringido
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;