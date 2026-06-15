import AdminPage from "@/components/admin/AdminPage";
import Seo from "@/components/Seo";

export default function Admin() {
  return <><Seo title="Administración | Husheniid" description="Panel privado de Husheniid." path="/admin" noIndex /><AdminPage /></>;
}
