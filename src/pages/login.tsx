"use client";

import AdminLogin from "@/components/admin/AdminLogin";

export default function Login() {
  const handleLoginSuccess = () => {
    try {
      localStorage.setItem("adminLogged", "true");
    } catch (e) {}
    if (typeof window !== "undefined") window.location.href = "/admin";
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted">
      <div className="container mx-auto px-4 py-12">
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      </div>
    </main>
  );
}
