"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  onLoginSuccess: () => void;
};

const AdminLogin = ({ onLoginSuccess }: Props) => {
  const { toast } = useToast();

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
        className: "bg-[#524F4A] text-white border-none shadow-xl",
      });
      onLoginSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#DBD8D3]/20 overflow-hidden font-sans z-[100]">
      {/* Elementos Decorativos de Fondo */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#DBD8D3_1.2px,transparent_1.2px)] [background-size:32px:32px] opacity-40" />
      
      {/* Orbes de luz decorativos */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-[#BB9E7A]/10 rounded-full blur-[120px] opacity-60" />
      <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-[#524F4A]/5 rounded-full blur-[120px] opacity-60" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10 px-6"
      >
        {/* BOTÓN VOLVER (Simulado con window.location para evitar dependencias externas) */}
        <button
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-[#BB9E7A] transition-all group outline-none"
          onClick={() => window.location.href = "/"}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Regresar a la Galería</span>
        </button>

        {/* CONTENEDOR DEL FORMULARIO */}
        <div className="bg-white rounded-[2.5rem] border border-[#DBD8D3]/50 shadow-[0_40px_80px_-15px_rgba(82,79,74,0.15)] p-10 md:p-12 relative">
          {/* Línea decorativa superior de marca */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#524F4A] via-[#BB9E7A] to-[#524F4A] rounded-t-[2.5rem]" />

          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#524F4A] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#524F4A]/20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#524F4A] tracking-tighter">Panel de <span className="italic font-serif">Autor</span></h2>
            <p className="text-slate-400 mt-3 text-xs uppercase tracking-widest font-medium">
              Acceso Restringido
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#524F4A]/60 ml-1">
                Identificador
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="admin@husheniid.com"
                  className="h-14 pl-12 rounded-2xl border-[#DBD8D3] bg-[#DBD8D3]/5 focus:bg-white focus:ring-[#BB9E7A] transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#524F4A]/60 ml-1">
                Clave de Seguridad
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-14 pl-12 rounded-2xl border-[#DBD8D3] bg-[#DBD8D3]/5 focus:bg-white focus:ring-[#BB9E7A] transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl bg-[#524F4A] hover:bg-[#BB9E7A] text-white font-bold transition-all duration-500 shadow-xl shadow-[#524F4A]/10 active:scale-[0.98]" 
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <span className="tracking-[0.2em] uppercase text-[10px]">Autenticar en el Sistema</span>
              )}
            </Button>
          </form>

          {/* FOOTER DEL FORM */}
          <div className="mt-10 pt-8 border-t border-[#DBD8D3]/30 text-center">
            <p className="text-[#524F4A]/30 text-[9px] font-bold uppercase tracking-[0.3em]">
              Husheniid Studio &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;