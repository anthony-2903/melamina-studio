"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        title: "Error de autenticación",
        description: "Correo o contraseña incorrectos",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Bienvenido administrador",
        description: "Acceso concedido correctamente",
        className: "bg-green-100 text-green-900 border-green-300",
      });

      onLoginSuccess();
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* BOTÓN VOLVER */}
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-sm"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al inicio
      </Button>

      {/* FORM */}
      <form
        onSubmit={handleLogin}
        className="space-y-4 bg-card p-6 rounded-xl shadow"
      >
        <h2 className="text-xl font-bold text-center">
          Acceso Administrador
        </h2>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="admin@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Validando..." : "Ingresar"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
