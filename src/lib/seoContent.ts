export const SITE_URL = "https://husheniid.com";
export const BUSINESS_NAME = "Husheniid";
export const PHONE = "+51979923148";
export const WHATSAPP_URL = "https://wa.me/51979923148";
export const ADDRESS = "Av. Coronel Parra, Cruce de Pilcomayo, Huancayo";

export type ServicePageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  h1: string;
  intro: string;
  imageKey: "kitchen" | "closet" | "office" | "living";
  keywords: string[];
  benefits: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
};

export const servicePages: ServicePageContent[] = [
  {
    slug: "/muebles-en-melamina-huancayo",
    eyebrow: "Fabricación local",
    title: "Muebles en Melamina en Huancayo | Husheniid",
    shortTitle: "Melamina Huancayo",
    description:
      "Muebles en melamina en Huancayo fabricados a medida: cocinas, closets, escritorios, centros de entretenimiento y mobiliario para negocios con diseño 3D.",
    h1: "Muebles en melamina en Huancayo",
    intro:
      "Diseñamos, fabricamos e instalamos muebles en melamina para hogares, oficinas y negocios en Huancayo. Trabajamos cada proyecto con medidas reales, asesoría de materiales, diseño 3D y acabados pensados para uso diario.",
    imageKey: "kitchen",
    keywords: [
      "muebles en melamina Huancayo",
      "muebles de melamina Huancayo",
      "fabricantes de muebles de melamina",
      "carpintería en melamina Huancayo",
    ],
    benefits: [
      "Fabricación a medida para cada ambiente",
      "Cocinas, closets, escritorios, repisas y muebles comerciales",
      "Diseño 3D para validar la propuesta antes de producir",
      "Portafolio con proyectos reales realizados en melamina",
    ],
    process: [
      "Recibimos fotos, medidas o coordinamos una visita técnica.",
      "Definimos el tipo de mueble, uso, acabados, colores y presupuesto.",
      "Preparamos una propuesta visual y técnica para aprobar el diseño.",
      "Fabricamos e instalamos el proyecto con revisión final de acabados.",
    ],
    faqs: [
      {
        question: "¿Qué muebles en melamina fabrican en Huancayo?",
        answer:
          "Fabricamos cocinas, closets, escritorios, centros de entretenimiento, repisas, módulos de oficina y muebles comerciales a medida.",
      },
      {
        question: "¿Puedo ver proyectos reales antes de cotizar?",
        answer:
          "Sí. Nuestro portafolio muestra proyectos individuales de melamina para revisar estilos, acabados y tipos de mueble antes de solicitar una cotización.",
      },
      {
        question: "¿Atienden fuera de Huancayo?",
        answer:
          "Atendemos principalmente Huancayo, Pilcomayo y zonas cercanas de Junín. Para otros lugares revisamos el proyecto y la disponibilidad de instalación.",
      },
    ],
  },
  {
    slug: "/cocinas-de-melamina-huancayo",
    eyebrow: "Cocinas a medida",
    title: "Cocinas de Melamina en Huancayo | Husheniid",
    shortTitle: "Cocinas",
    description:
      "Diseñamos y fabricamos cocinas de melamina a medida en Huancayo con diseño 3D, visita técnica, herrajes de calidad e instalación profesional.",
    h1: "Cocinas de melamina en Huancayo",
    intro:
      "Creamos cocinas funcionales, resistentes y elegantes para departamentos, casas y negocios. Cada proyecto parte de medidas reales, distribución inteligente y una propuesta visual en 3D antes de fabricar.",
    imageKey: "kitchen",
    keywords: [
      "cocinas de melamina Huancayo",
      "cocinas integrales Huancayo",
      "muebles de cocina a medida",
      "diseño de cocinas 3D",
    ],
    benefits: [
      "Diseño 3D antes de fabricar",
      "Distribución pensada para almacenamiento y uso diario",
      "Acabados en melamina, high gloss y texturas premium",
      "Instalación profesional en Huancayo y Pilcomayo",
    ],
    process: [
      "Tomamos medidas y revisamos puntos de agua, gas y electricidad.",
      "Diseñamos la propuesta con distribución, colores y herrajes.",
      "Fabricamos las piezas en taller y coordinamos la instalación.",
      "Entregamos la cocina instalada, limpia y lista para usar.",
    ],
    faqs: [
      {
        question: "¿Cuánto cuesta una cocina de melamina en Huancayo?",
        answer:
          "El precio depende de medidas, distribución, accesorios, tipo de tablero y herrajes. Para cotizar con precisión pedimos fotos, medidas o una visita técnica.",
      },
      {
        question: "¿Hacen diseño 3D antes de fabricar?",
        answer:
          "Sí. Preparamos una propuesta visual para validar distribución, colores y acabados antes de pasar a producción.",
      },
      {
        question: "¿Qué melamina recomiendan para cocina?",
        answer:
          "Recomendamos tableros resistentes y acabados fáciles de limpiar. La elección final depende de humedad, uso diario, presupuesto y estilo del espacio.",
      },
    ],
  },
  {
    slug: "/closets-de-melamina-huancayo",
    eyebrow: "Dormitorios organizados",
    title: "Closets de Melamina en Huancayo | Husheniid",
    shortTitle: "Closets",
    description:
      "Fabricamos closets de melamina a medida en Huancayo: roperos, walk-in closets, puertas corredizas, cajonería y organización interior personalizada.",
    h1: "Closets de melamina en Huancayo",
    intro:
      "Diseñamos closets que aprovechan cada centímetro del dormitorio, con módulos para ropa larga, cajones, maleteros, zapateras y acabados acordes al estilo de tu hogar.",
    imageKey: "closet",
    keywords: [
      "closets de melamina Huancayo",
      "roperos de melamina a medida",
      "walk in closet Huancayo",
      "closet con puertas corredizas",
    ],
    benefits: [
      "Distribución interior personalizada",
      "Opciones con puertas batientes o corredizas",
      "Diseño limpio para dormitorios pequeños o amplios",
      "Acabados modernos y fáciles de mantener",
    ],
    process: [
      "Medimos el espacio y definimos necesidades de guardado.",
      "Proponemos módulos internos según ropa, zapatos y accesorios.",
      "Elegimos acabados, tiradores, espejos y sistema de puertas.",
      "Fabricamos e instalamos cuidando nivelación y detalles finales.",
    ],
    faqs: [
      {
        question: "¿Pueden hacer closets para espacios pequeños?",
        answer:
          "Sí. Adaptamos fondo, altura, puertas y distribución interior para aprovechar espacios reducidos sin saturar el dormitorio.",
      },
      {
        question: "¿Trabajan puertas corredizas?",
        answer:
          "Sí. Podemos instalar puertas corredizas, batientes o combinadas según el espacio disponible y el estilo que busques.",
      },
      {
        question: "¿Incluyen cajones y zapatera?",
        answer:
          "Sí. El diseño puede incluir cajoneras, zapateras, maleteros, barras, divisiones y accesorios de organización.",
      },
    ],
  },
  {
    slug: "/muebles-de-oficina-huancayo",
    eyebrow: "Oficinas funcionales",
    title: "Muebles de Oficina en Melamina Huancayo | Husheniid",
    shortTitle: "Oficinas",
    description:
      "Diseño y fabricación de escritorios, módulos, repisas, archivadores y muebles de oficina en melamina a medida en Huancayo.",
    h1: "Muebles de oficina en melamina en Huancayo",
    intro:
      "Equipamos oficinas, estudios y negocios con muebles de melamina diseñados para trabajar cómodo, ordenar documentos y proyectar una imagen profesional.",
    imageKey: "office",
    keywords: [
      "muebles de oficina Huancayo",
      "escritorios de melamina Huancayo",
      "muebles para negocio en melamina",
      "archivadores de melamina",
    ],
    benefits: [
      "Diseños pensados para productividad y orden",
      "Medidas adaptadas a oficinas pequeñas o comerciales",
      "Acabados sobrios para atención al cliente y equipos de trabajo",
      "Módulos, repisas, escritorios y archivadores a medida",
    ],
    process: [
      "Revisamos la dinámica de trabajo y flujo del espacio.",
      "Definimos medidas, cableado, almacenamiento y puestos necesarios.",
      "Fabricamos módulos resistentes para uso continuo.",
      "Instalamos con acabados limpios y alineados a tu marca.",
    ],
    faqs: [
      {
        question: "¿Hacen muebles para locales comerciales?",
        answer:
          "Sí. Diseñamos módulos de atención, escritorios, repisas, archivadores y muebles para distintos tipos de negocio.",
      },
      {
        question: "¿Pueden fabricar varios puestos de trabajo?",
        answer:
          "Sí. Podemos producir estaciones individuales o módulos compartidos según la cantidad de usuarios y el espacio disponible.",
      },
      {
        question: "¿Incluyen pasacables?",
        answer:
          "Sí. Podemos considerar pasacables, zonas para tomacorrientes y soluciones para mantener el escritorio ordenado.",
      },
    ],
  },
  {
    slug: "/centros-de-entretenimiento-huancayo",
    eyebrow: "Sala y entretenimiento",
    title: "Centros de Entretenimiento en Melamina Huancayo | Husheniid",
    shortTitle: "Entretenimiento",
    description:
      "Fabricamos centros de entretenimiento, paneles TV, repisas flotantes y muebles de sala en melamina a medida en Huancayo.",
    h1: "Centros de entretenimiento en melamina en Huancayo",
    intro:
      "Diseñamos muebles de sala que integran TV, almacenamiento, decoración e iluminación para lograr un ambiente moderno y bien organizado.",
    imageKey: "living",
    keywords: [
      "centros de entretenimiento Huancayo",
      "muebles para TV en melamina",
      "repisas flotantes Huancayo",
      "panel TV melamina",
    ],
    benefits: [
      "Diseños a medida para TV, audio y decoración",
      "Opciones con iluminación, repisas y puertas ocultas",
      "Acabados que combinan con sala, comedor o dormitorio",
      "Instalación nivelada y segura en pared",
    ],
    process: [
      "Medimos el muro y definimos ubicación de TV y tomacorrientes.",
      "Proponemos distribución de repisas, cajones y espacios decorativos.",
      "Fabricamos el mueble con refuerzos y acabados adecuados.",
      "Instalamos y dejamos el sistema listo para organizar equipos.",
    ],
    faqs: [
      {
        question: "¿Pueden ocultar cables de TV?",
        answer:
          "Sí. En la etapa de diseño consideramos salidas, pasacables y espacios para organizar equipos y conexiones.",
      },
      {
        question: "¿Hacen repisas flotantes?",
        answer:
          "Sí. Podemos fabricar repisas flotantes, paneles, módulos bajos y composiciones completas para sala o dormitorio.",
      },
      {
        question: "¿El diseño se adapta al tamaño de mi televisor?",
        answer:
          "Sí. Tomamos medidas del televisor y del muro para que el mueble quede proporcionado y funcional.",
      },
    ],
  },
  {
    slug: "/muebles-a-medida-huancayo",
    eyebrow: "Diseño personalizado",
    title: "Muebles a Medida en Melamina Huancayo | Husheniid",
    shortTitle: "A medida",
    description:
      "Diseñamos muebles a medida en melamina para hogares y negocios en Huancayo: cocinas, closets, escritorios, repisas y proyectos personalizados.",
    h1: "Muebles a medida en melamina en Huancayo",
    intro:
      "Si tienes una idea, un espacio difícil o necesitas un mueble único, desarrollamos la propuesta desde medidas reales hasta diseño 3D, fabricación e instalación.",
    imageKey: "kitchen",
    keywords: [
      "muebles a medida Huancayo",
      "muebles de melamina Huancayo",
      "carpintería en melamina Huancayo",
      "diseño de muebles 3D Huancayo",
    ],
    benefits: [
      "Soluciones para hogares, oficinas y negocios",
      "Diseño 3D y asesoría de materiales",
      "Fabricación adaptada a medidas reales",
      "Acompañamiento desde idea hasta instalación",
    ],
    process: [
      "Escuchamos la necesidad y revisamos fotos o medidas iniciales.",
      "Definimos función, estilo, acabados y presupuesto objetivo.",
      "Desarrollamos diseño y detalles técnicos para fabricación.",
      "Fabricamos e instalamos con revisión final del proyecto.",
    ],
    faqs: [
      {
        question: "¿Qué tipo de muebles personalizados hacen?",
        answer:
          "Hacemos cocinas, closets, escritorios, centros de entretenimiento, repisas, muebles comerciales y soluciones especiales en melamina.",
      },
      {
        question: "¿Pueden cotizar solo con fotos?",
        answer:
          "Podemos dar una estimación inicial con fotos y medidas. Para una cotización exacta conviene validar medidas y detalles técnicos.",
      },
      {
        question: "¿Trabajan para negocios?",
        answer:
          "Sí. Fabricamos módulos, mostradores, escritorios, repisas y mobiliario a medida para locales y oficinas.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

export function createServiceJsonLd(page: ServicePageContent) {
  const url = `${SITE_URL}${page.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      description: page.description,
      provider: {
        "@type": "LocalBusiness",
        name: BUSINESS_NAME,
        telephone: PHONE,
        address: {
          "@type": "PostalAddress",
          streetAddress: ADDRESS,
          addressLocality: "Huancayo",
          addressRegion: "Junín",
          addressCountry: "PE",
        },
      },
      areaServed: ["Huancayo", "Pilcomayo", "Junín"],
      serviceType: page.shortTitle,
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.shortTitle,
          item: url,
        },
      ],
    },
  ];
}
