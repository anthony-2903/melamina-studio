"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import { m, Variants } from "framer-motion";
import heroKitchen from "@/assets/hero-kitchen.jpg";

type Props = {
  onLoginSuccess: () => void;
};

const AdminLogin = ({ onLoginSuccess }: Props) => {
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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
          title: "Autenticacion exitosa",
          description: "Bienvenido al panel de control de Husheniid.",
          className: "bg-[#524F4A] text-white border-none shadow-xl",
        });
        onLoginSuccess();
      }
    } catch (error) {
      toast({
        title: "Acceso denegado",
        description: error instanceof Error ? error.message : "Intentalo nuevamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#E8E4DE] font-sans">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(187,158,122,0.28),transparent_32%),radial-gradient(circle_at_88%_85%,rgba(82,79,74,0.14),transparent_30%)]" />
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-5 py-8 md:px-8"
      >
        <m.button
          variants={itemVariants}
          type="button"
          className="group mb-5 flex w-fit items-center gap-2 text-[#524F4A]/60 outline-none transition-colors hover:text-[#BB9E7A]"
          onClick={() => window.location.href = "/"}
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Regresar a la galería</span>
        </m.button>

        <m.div
          variants={itemVariants}
          className="grid overflow-hidden rounded-[2.25rem] border border-white/70 bg-[#F8F7F4] shadow-[0_35px_90px_-30px_rgba(82,79,74,0.45)] md:min-h-[640px] md:grid-cols-[1.08fr_0.92fr]"
        >
          <section className="relative min-h-[230px] overflow-hidden md:min-h-full">
            <img
              src={heroKitchen}
              alt="Cocina de melamina diseñada por Husheniid"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#302E2A]/90 via-[#524F4A]/25 to-transparent" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-7 md:p-9">
              <span className="font-serif text-xl font-bold italic tracking-tight text-white">Husheniid</span>
              <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">Studio</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.3em] text-[#E4C59F]">Diseño & fabricación</p>
              <h1 className="max-w-md font-serif text-3xl font-semibold italic leading-tight md:text-5xl">
                Espacios creados para sentirse tuyos.
              </h1>
              <div className="mt-7 flex items-center gap-2" aria-hidden="true">
                <span className="h-1.5 w-10 rounded-full bg-[#E4C59F]" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
              </div>
            </div>
          </section>

          <section className="flex flex-col justify-center px-7 py-10 sm:px-12 md:px-14 lg:px-16">
            <m.div variants={itemVariants} className="mb-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#524F4A] text-white shadow-lg shadow-[#524F4A]/20">
                <ShieldCheck size={24} strokeWidth={1.6} />
              </div>
              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-[#BB9E7A]">Acceso restringido</p>
              <h2 className="text-4xl font-bold tracking-tighter text-[#524F4A]">Bienvenido</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">Ingresa tus credenciales para administrar el portafolio de Husheniid.</p>
            </m.div>

            <form onSubmit={handleLogin} className="space-y-5">
              <m.div variants={itemVariants} className="space-y-2">
                <Label className="ml-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#524F4A]/60">Correo electrónico</Label>
                <div className="group relative">
                  <Mail className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#BB9E7A]" />
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="usuario@correo.com"
                    className="h-14 rounded-2xl border-[#DBD8D3] bg-white pl-12 text-[#524F4A] shadow-sm transition-all placeholder:text-slate-300 focus:border-[#BB9E7A] focus:ring-4 focus:ring-[#BB9E7A]/10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </m.div>

              <m.div variants={itemVariants} className="space-y-2">
                <Label className="ml-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#524F4A]/60">Contraseña</Label>
                <div className="group relative">
                  <Lock className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#BB9E7A]" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="h-14 rounded-2xl border-[#DBD8D3] bg-white pl-12 pr-12 text-[#524F4A] shadow-sm transition-all placeholder:text-slate-300 focus:border-[#BB9E7A] focus:ring-4 focus:ring-[#BB9E7A]/10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    aria-pressed={showPassword}
                    title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-[#BB9E7A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BB9E7A]"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                  </button>
                </div>
              </m.div>

              <m.div variants={itemVariants} className="pt-2">
                <Button
                  type="submit"
                  className="group relative h-14 w-full overflow-hidden rounded-2xl bg-[#524F4A] font-bold text-white shadow-xl shadow-[#524F4A]/20 transition-all duration-500 hover:bg-[#BB9E7A] active:scale-[0.98]"
                  disabled={loading}
                >
                  <div className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-500 group-hover:translate-y-0" />
                  <div className="relative z-10 flex items-center justify-center">
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span className="text-[10px] uppercase tracking-[0.2em]">Ingresar al panel</span>}
                  </div>
                </Button>
              </m.div>
            </form>

            <m.div variants={itemVariants} className="mt-9 border-t border-[#DBD8D3]/70 pt-6">
              <p className="text-center text-[8px] font-bold uppercase tracking-[0.28em] text-[#524F4A]/35">Husheniid Studio &copy; {new Date().getFullYear()}</p>
            </m.div>
          </section>
        </m.div>
      </m.div>
    </div>
  );
};

export default AdminLogin;
