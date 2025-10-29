"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí validas credenciales (temporal hardcode)
    if (username === "admin" && password === "123456") {
      toast({ title: "¡Bienvenido admin!" });
      onLoginSuccess();
    } else {
      toast({ title: "Error", description: "Usuario o contraseña incorrectos" });
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-8 bg-card rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Login Admin</h2>
      <div className="space-y-2">
        <label>Usuario</label>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <label>Contraseña</label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full">Ingresar</Button>
    </form>
  );
};

export default AdminLogin;
