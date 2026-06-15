import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Seo from "@/components/Seo";
import DeferredSection from "@/components/DeferredSection";
import { useLocation } from "react-router-dom";

const Portfolio = lazy(() => import("@/components/Portfolio"));
const MaterialCatalog = lazy(() => import("@/components/MaterialCatalog"));
const Services = lazy(() => import("@/components/Services"));
const About = lazy(() => import("@/components/About"));
const Location = lazy(() => import("@/components/Location"));
const Contact = lazy(() => import("@/components/Contact"));

const SectionLoader = () => <div className="min-h-48 bg-[#F8F7F4]" aria-hidden="true" />;

const Index = () => {
  const { pathname } = useLocation();
  const isProjectsPage = pathname === "/proyectos";
  return (
    <div className="min-h-screen">
      <Seo
        path={pathname}
        title={isProjectsPage ? "Proyectos de Melamina en Huancayo | Husheniid" : "Husheniid | Muebles de Melamina en Huancayo"}
        description={isProjectsPage ? "Explora proyectos de cocinas, clósets y muebles de melamina fabricados a medida en Huancayo." : "Diseño y fabricación de muebles de melamina a medida en Huancayo, con diseño 3D y acabados premium."}
      />
      <Header />
      <main>
        {!isProjectsPage && <Hero />}
        <Suspense fallback={<SectionLoader />}>
          {isProjectsPage ? <Portfolio /> : <DeferredSection minHeight={650} rootMargin="0px" targetId="portafolio"><Portfolio /></DeferredSection>}
          {!isProjectsPage && <DeferredSection minHeight={900} targetId="materiales"><MaterialCatalog /></DeferredSection>}
          {!isProjectsPage && <DeferredSection targetId="servicios"><Services /></DeferredSection>}
          {!isProjectsPage && <DeferredSection targetId="conocenos"><About /></DeferredSection>}
          {!isProjectsPage && <DeferredSection><Location /></DeferredSection>}
          {!isProjectsPage && <DeferredSection targetId="contacto"><Contact /></DeferredSection>}
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
