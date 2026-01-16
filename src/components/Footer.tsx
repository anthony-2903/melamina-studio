import { Phone, Mail, MapPin, Facebook, Instagram, Music2, ArrowUpRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Elemento Decorativo: Gradiente de esquina */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* COLUMNA 1: BRANDING */}
          <motion.div variants={itemVariants} className="md:col-span-5 space-y-8">
            <h3 className="text-4xl font-bold tracking-tighter italic">
              estudio <span className="text-orange-600">husheniid</span>
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              Elevamos el estándar de la carpintería en melamina. Diseño de autor para espacios que inspiran en Huancayo.
            </p>
            
            {/* Redes Sociales Actualizadas */}
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61551909329314#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center transition-all duration-500 hover:border-orange-600 hover:text-orange-600 hover:-translate-y-2"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/hugocaldeton/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center transition-all duration-500 hover:border-orange-600 hover:text-orange-600 hover:-translate-y-2"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.tiktok.com/@husheniid?lang=es-419" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center transition-all duration-500 hover:border-orange-600 hover:text-orange-600 hover:-translate-y-2"
              >
                <Music2 size={20} /> {/* Music2 es el icono estándar para TikTok en Lucide */}
              </a>
            </div>
          </motion.div>

          {/* COLUMNA 2: NAVEGACIÓN */}
          <motion.div variants={itemVariants} className="md:col-span-3 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-orange-600">Navegación</h4>
            <ul className="space-y-4">
              {["Portafolio", "Servicios", "Conócenos", "Contacto"].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-slate-400 hover:text-white flex items-center gap-2 group transition-colors"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-orange-600 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMNA 3: CONTACTO */}
          <motion.div variants={itemVariants} className="md:col-span-4 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-orange-600">Ubicación</h4>
            <div className="space-y-6 text-slate-400">
              <div className="flex gap-4">
                <MapPin className="text-orange-600 shrink-0" size={20} />
                <p>AV Coronel Parra, ref Cruce de Pilcomayo,<br />Huancayo, Perú</p>
              </div>
              <div className="flex gap-4">
                <Phone className="text-orange-600 shrink-0" size={20} />
                <a href="tel:+51979923148" className="hover:text-white transition-colors">+51 979 923 148</a>
              </div>
              <div className="flex gap-4">
                <Mail className="text-orange-600 shrink-0" size={20} />
                <a href="mailto:contacto@husheniid.com" className="hover:text-white transition-colors">contacto@husheniid.com</a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM BAR */}
        <motion.div 
          className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-slate-500 text-sm">
            © {currentYear} <span className="font-bold text-slate-300 uppercase">Estudio Husheniid</span>.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <a href="https://wa.me/51979923148" target="_blank" className="flex items-center gap-1 text-orange-600 hover:text-orange-500 transition-colors">
              Solicitar Cotización <ArrowUpRight size={12} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* TEXTO DE FONDO */}
      <div className="absolute -bottom-10 left-0 w-full overflow-hidden opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[15rem] font-bold leading-none whitespace-nowrap -mb-10">
          MELAMINA DE ALTA GAMA
        </h2>
      </div>
    </footer>
  );
};

export default Footer;