"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
        title: "❌ Error de autenticación",
        description: "Credenciales incorrectas",
      });
    } else {
      toast({ title: "✅ Bienvenido administrador" });
      onLoginSuccess();
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4 bg-card p-6 rounded-lg shadow w-full max-w-sm"
    >
      <h2 className="text-xl font-bold text-center">Login Admin</h2>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Validando..." : "Ingresar"}
      </Button>
    </form>
  );
};

export default AdminLogin;
