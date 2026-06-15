import AdminLogin from "@/components/admin/AdminLogin";
import { useNavigate } from "react-router-dom";
import Seo from "@/components/Seo";

export default function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/admin", { replace: true });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted">
      <Seo title="Acceso administrativo | Husheniid" description="Panel privado de Husheniid." path="/login" noIndex />
      <div className="container mx-auto px-4 py-12">
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      </div>
    </main>
  );
}
