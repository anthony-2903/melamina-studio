import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { Navigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { createServiceJsonLd, getServicePage, WHATSAPP_URL } from "@/lib/seoContent";
import { getOptimizedUrl } from "@/lib/cloudinary";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import closetImage from "@/assets/portfolio-closet.jpg";
import officeImage from "@/assets/portfolio-office.jpg";
import livingImage from "@/assets/portfolio-sala.jpg";

const imageMap = {
  kitchen: heroKitchen,
  closet: closetImage,
  office: officeImage,
  living: livingImage,
};

export default function ServicePage() {
  const { pathname } = useLocation();
  const page = getServicePage(pathname);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  const image = imageMap[page.imageKey];
  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(
    `Hola Husheniid, quiero cotizar ${page.shortTitle.toLowerCase()} en Huancayo.`,
  )}`;

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Seo
        path={page.slug}
        title={page.title}
        description={page.description}
        image="https://husheniid.com/og-image.webp"
        jsonLd={createServiceJsonLd(page)}
      />
      <Header />
      <main>
        <section className="relative min-h-[92vh] overflow-hidden bg-[#DBD8D3] pt-36">
          <img
            src={getOptimizedUrl(image, 1600)}
            srcSet={`${getOptimizedUrl(image, 640)} 640w, ${getOptimizedUrl(image, 1200)} 1200w, ${getOptimizedUrl(image, 1600)} 1600w`}
            sizes="100vw"
            alt={page.h1}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#DBD8D3] via-[#DBD8D3]/90 to-[#DBD8D3]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F4] via-transparent to-transparent" />

          <div className="container relative z-10 mx-auto flex min-h-[72vh] items-center px-6">
            <div className="max-w-4xl">
              <span className="mb-5 block text-[10px] font-black uppercase tracking-[0.4em] text-[#BB9E7A]">
                {page.eyebrow}
              </span>
              <h1 className="max-w-5xl text-5xl font-bold leading-[0.95] tracking-tight text-[#524F4A] sm:text-6xl md:text-8xl">
                {page.h1}
              </h1>
              <p className="mt-8 max-w-2xl border-l-2 border-[#BB9E7A] pl-6 text-lg leading-relaxed text-[#524F4A]/80 md:text-xl">
                {page.intro}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="h-14 rounded-full bg-[#524F4A] px-8 text-white hover:bg-[#BB9E7A]">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle size={20} />
                    Cotizar por WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-14 rounded-full border-[#524F4A]/20 bg-white/50 px-8 text-[#524F4A] hover:bg-white">
                  <a href="/proyectos" className="flex items-center gap-2">
                    Ver proyectos
                    <ArrowRight size={18} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F8F7F4] py-20">
          <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="mb-4 block text-[10px] font-black uppercase tracking-[0.4em] text-[#BB9E7A]">
                Búsquedas relacionadas
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-[#524F4A] md:text-6xl">
                Diseño pensado para Huancayo
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-500">
                Atendemos proyectos en Huancayo, Pilcomayo y zonas cercanas con asesoría de materiales, medidas reales y fabricación a medida.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {page.keywords.map((keyword) => (
                <div key={keyword} className="rounded-3xl border border-[#DBD8D3] bg-white p-6 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#524F4A]">{keyword}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container mx-auto grid gap-14 px-6 lg:grid-cols-2">
            <div>
              <span className="mb-4 block text-[10px] font-black uppercase tracking-[0.4em] text-[#BB9E7A]">
                Beneficios
              </span>
              <h2 className="mb-8 text-4xl font-bold tracking-tight text-[#524F4A] md:text-5xl">
                Lo que cuidamos en cada proyecto
              </h2>
              <div className="space-y-4">
                {page.benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-4 rounded-3xl bg-[#F8F7F4] p-5">
                    <CheckCircle2 className="mt-1 shrink-0 text-[#BB9E7A]" size={22} />
                    <p className="text-[#524F4A]/80">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="mb-4 block text-[10px] font-black uppercase tracking-[0.4em] text-[#BB9E7A]">
                Proceso
              </span>
              <h2 className="mb-8 text-4xl font-bold tracking-tight text-[#524F4A] md:text-5xl">
                De la idea a la instalación
              </h2>
              <ol className="space-y-5">
                {page.process.map((step, index) => (
                  <li key={step} className="flex gap-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#524F4A] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="pt-2 text-[#524F4A]/80">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-[#F8F7F4] py-20">
          <div className="container mx-auto px-6">
            <div className="mb-12 max-w-3xl">
              <span className="mb-4 block text-[10px] font-black uppercase tracking-[0.4em] text-[#BB9E7A]">
                Preguntas frecuentes
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-[#524F4A] md:text-5xl">
                Dudas comunes antes de cotizar
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {page.faqs.map((faq) => (
                <article key={faq.question} className="rounded-3xl border border-[#DBD8D3] bg-white p-7 shadow-sm">
                  <h3 className="mb-4 text-xl font-bold text-[#524F4A]">{faq.question}</h3>
                  <p className="leading-relaxed text-slate-500">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#524F4A] py-16 text-white">
          <div className="container mx-auto flex flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
            <div>
              <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.4em] text-[#BB9E7A]">
                Cotización directa
              </span>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                Cuéntanos qué espacio quieres transformar
              </h2>
            </div>
            <Button asChild className="h-14 rounded-full bg-[#BB9E7A] px-8 text-white hover:bg-white hover:text-[#524F4A]">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Solicitar asesoría
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
