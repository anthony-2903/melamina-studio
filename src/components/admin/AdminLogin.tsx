"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#DBD8D3]/30 overflow-hidden font-sans z-[100]">
      {/* Patrón de Fondo Animado */}
      <motion.div
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(#524F4A_1.2px,transparent_1.2px)] [background-size:32px:32px] opacity-[0.03]"
      />

      {/* Orbes Mágicos Flotantes */}
      <motion.div
        animate={{ y: [-40, 40, -40], x: [-30, 30, -30], scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[#BB9E7A]/30 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ y: [40, -40, 40], x: [30, -30, 30], scale: [1, 1.1, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-[#524F4A]/20 rounded-full blur-[120px]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md z-10 px-6"
      >
        <motion.button
          variants={itemVariants}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-[#BB9E7A] transition-all group outline-none"
          onClick={() => window.location.href = "/"}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Regresar a la Galería</span>
        </motion.button>

        {/* CONTENEDOR EFECTO CRISTAL (Glassmorphism) */}
        <motion.div
          variants={itemVariants}
          className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_40px_80px_-15px_rgba(82,79,74,0.15)] p-10 md:p-12 relative overflow-hidden"
        >
          {/* Brillo Superior */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#524F4A] via-[#BB9E7A] to-[#524F4A]" />

          <motion.div variants={itemVariants} className="flex justify-center mb-8 relative">
            <div className="absolute inset-0 bg-[#BB9E7A] blur-[30px] opacity-20 animate-pulse rounded-full" />
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 bg-[#524F4A] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#524F4A]/20 relative z-10"
            >
              <ShieldCheck size={32} strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#524F4A] tracking-tighter">Panel de <span className="italic font-serif">Autor</span></h2>
            <p className="text-[#BB9E7A] mt-2 text-[10px] uppercase tracking-[0.3em] font-bold bg-[#BB9E7A]/10 inline-block px-3 py-1 rounded-full">
              Acceso Restringido
            </p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#524F4A]/60 ml-1">
                Identificador
              </Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#BB9E7A] transition-colors w-5 h-5 z-10" />
                <Input
                  type="email"
                  placeholder="usuario@correo.com"
                  className="h-14 pl-12 rounded-2xl border-white/40 bg-white/50 focus:bg-white focus:border-[#BB9E7A] focus:ring-4 focus:ring-[#BB9E7A]/10 transition-all shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#524F4A]/60 ml-1">
                Clave de Seguridad
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#BB9E7A] transition-colors w-5 h-5 z-10" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-14 pl-12 rounded-2xl border-white/40 bg-white/50 focus:bg-white focus:border-[#BB9E7A] focus:ring-4 focus:ring-[#BB9E7A]/10 transition-all shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="relative w-full h-14 rounded-2xl bg-[#524F4A] hover:bg-[#BB9E7A] text-white font-bold transition-all duration-500 shadow-xl shadow-[#524F4A]/20 overflow-hidden group active:scale-[0.98]"
                disabled={loading}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out" />
                <div className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    <span className="tracking-[0.2em] uppercase text-[10px]">Autenticar en el Sistema</span>
                  )}
                </div>
              </Button>
            </motion.div>
          </form>

          {/* FOOTER DEL FORM */}
          <motion.div variants={itemVariants} className="mt-10 pt-8 border-t border-white/40 text-center">
            <p className="text-[#524F4A]/40 text-[9px] font-bold uppercase tracking-[0.3em]">
              Husheniid Studio &copy; {new Date().getFullYear()}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;