import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Seo from "@/components/Seo";
import DeferredSection from "@/components/DeferredSection";
import { useLocation } from "react-router-dom";
import { SITE_URL, servicePages } from "@/lib/seoContent";

const Portfolio = lazy(() => import("@/components/Portfolio"));
const MaterialCatalog = lazy(() => import("@/components/MaterialCatalog"));
const Services = lazy(() => import("@/components/Services"));
const About = lazy(() => import("@/components/About"));
const Location = lazy(() => import("@/components/Location"));
const Contact = lazy(() => import("@/components/Contact"));

const SectionLoader = ({ minHeight = 700 }: { minHeight?: number }) => (
  <div style={{ minHeight }} className="bg-[#F8F7F4]" aria-hidden="true" />
);

const HomeFaq = () => (
  <section className="bg-white py-20">
    <div className="container mx-auto px-6">
      <div className="mb-12 max-w-3xl">
        <span className="mb-4 block text-[10px] font-black uppercase tracking-[0.4em] text-[#BB9E7A]">
          Preguntas frecuentes
        </span>
        <h2 className="text-4xl font-bold tracking-tight text-[#524F4A] md:text-5xl">
          Antes de cotizar tus muebles de melamina
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {homeFaqs.map((faq) => (
          <article key={faq.question} className="rounded-3xl border border-[#DBD8D3] bg-[#F8F7F4] p-7">
            <h3 className="mb-4 text-xl font-bold text-[#524F4A]">{faq.question}</h3>
            <p className="leading-relaxed text-slate-500">{faq.answer}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const homeFaqs = [
  {
    question: "¿Husheniid fabrica muebles de melamina a medida en Huancayo?",
    answer:
      "Sí. Diseñamos, fabricamos e instalamos muebles de melamina a medida para hogares, oficinas y negocios en Huancayo, Pilcomayo y zonas cercanas.",
  },
  {
    question: "¿Realizan diseño 3D antes de fabricar?",
    answer:
      "Sí. El diseño 3D ayuda a validar distribución, colores, acabados y detalles antes de iniciar la fabricación del mueble.",
  },
  {
    question: "¿Qué tipos de muebles hacen?",
    answer:
      "Fabricamos cocinas, closets, centros de entretenimiento, escritorios, repisas, muebles comerciales y proyectos personalizados en melamina.",
  },
];

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FurnitureStore"],
    name: "Husheniid - Estudio de Melamina",
    image: `${SITE_URL}/logo-husheniid.png`,
    "@id": `${SITE_URL}/`,
    url: `${SITE_URL}/`,
    telephone: "+51979923148",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Coronel Parra, Cruce de Pilcomayo",
      addressLocality: "Huancayo",
      addressRegion: "Junín",
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -12.053199,
      longitude: -75.245915,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    areaServed: ["Huancayo", "Pilcomayo", "Junín"],
    sameAs: [
      "https://www.facebook.com/profile.php?id=61551909329314",
      "https://www.instagram.com/hugocaldeton/",
      "https://www.tiktok.com/@husheniid",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: servicePages.map((page) => page.shortTitle),
    url: servicePages.map((page) => `${SITE_URL}${page.slug}`),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

const Index = () => {
  const { pathname } = useLocation();
  const isProjectsPage = pathname === "/proyectos";
  return (
    <div className="min-h-screen">
      <Seo
        path={pathname}
        title={isProjectsPage ? "Proyectos de Melamina en Huancayo | Husheniid" : "Husheniid | Muebles de Melamina en Huancayo"}
        description={isProjectsPage ? "Explora proyectos de cocinas, clósets y muebles de melamina fabricados a medida en Huancayo." : "Diseño y fabricación de muebles de melamina a medida en Huancayo, con diseño 3D y acabados premium."}
        jsonLd={isProjectsPage ? undefined : homeJsonLd}
      />
      <Header />
      <main>
        {!isProjectsPage && <Hero />}
        {isProjectsPage ? (
          <Suspense fallback={<SectionLoader minHeight={900} />}>
            <Portfolio />
          </Suspense>
        ) : (
          <>
            <DeferredSection minHeight={1200} rootMargin="0px" targetId="portafolio"><Portfolio /></DeferredSection>
            <DeferredSection minHeight={1800} targetId="materiales"><MaterialCatalog /></DeferredSection>
            <DeferredSection minHeight={1100} targetId="servicios"><Services /></DeferredSection>
            <DeferredSection minHeight={700}><HomeFaq /></DeferredSection>
            <DeferredSection minHeight={1100} targetId="conocenos"><About /></DeferredSection>
            <DeferredSection minHeight={1300}><Location /></DeferredSection>
            <DeferredSection minHeight={1300} targetId="contacto"><Contact /></DeferredSection>
          </>
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
