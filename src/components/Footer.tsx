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
    <footer className="bg-[#524F4A] text-white pt-24 pb-12 overflow-hidden relative border-t border-[#BB9E7A]/10">
      {/* Elemento Decorativo: Gradiente de esquina en Dorado Arena */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#BB9E7A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* COLUMNA 1: BRANDING */}
          <motion.div variants={itemVariants} className="md:col-span-5 space-y-8">
            <h3 className="text-4xl font-bold tracking-tighter italic font-serif">
              estudio <span className="text-[#BB9E7A]">husheniid</span>
            </h3>
            <p className="text-[#DBD8D3]/70 text-lg leading-relaxed max-w-sm font-light">
              Elevamos el estándar de la carpintería en melamina. Diseño de autor para espacios que inspiran en Huancayo.
            </p>
            
            {/* Redes Sociales con estilo Minimal Dorado */}
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61551909329314#" },
                { icon: Instagram, href: "https://www.instagram.com/hugocaldeton/" },
                { icon: Music2, href: "https://www.tiktok.com/@husheniid" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-[#DBD8D3]/20 flex items-center justify-center transition-all duration-500 hover:border-[#BB9E7A] hover:text-[#BB9E7A] hover:-translate-y-2 bg-white/5"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* COLUMNA 2: NAVEGACIÓN */}
          <motion.div variants={itemVariants} className="md:col-span-3 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-[#BB9E7A]">Explorar</h4>
            <ul className="space-y-4">
              {["Portafolio", "Servicios", "Conócenos", "Contacto"].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-[#DBD8D3]/60 hover:text-white flex items-center gap-2 group transition-colors text-sm font-medium"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#BB9E7A] transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMNA 3: CONTACTO */}
          <motion.div variants={itemVariants} className="md:col-span-4 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-[#BB9E7A]">Ubicación</h4>
            <div className="space-y-6 text-[#DBD8D3]/60 text-sm">
              <div className="flex gap-4">
                <MapPin className="text-[#BB9E7A] shrink-0" size={18} />
                <p className="leading-relaxed font-light">AV Coronel Parra, ref Cruce de Pilcomayo,<br />Huancayo, Perú</p>
              </div>
              <div className="flex gap-4">
                <Phone className="text-[#BB9E7A] shrink-0" size={18} />
                <a href="tel:+51979923148" className="hover:text-white transition-colors">+51 979 923 148</a>
              </div>
              <div className="flex gap-4">
                <Mail className="text-[#BB9E7A] shrink-0" size={18} />
                <a href="mailto:contacto@husheniid.com" className="hover:text-white transition-colors font-light">contacto@husheniid.com</a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM BAR */}
        <motion.div 
          className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[#DBD8D3]/30 text-[11px] font-medium tracking-wide">
            © {currentYear} <span className="font-bold text-[#DBD8D3]/50">ESTUDIO HUSHENIID</span>.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#DBD8D3]/50">
            <a href="https://wa.me/51979923148" target="_blank" className="flex items-center gap-2 text-[#BB9E7A] hover:brightness-125 transition-all">
              Solicitar Cotización <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* TEXTO DE FONDO GIGANTE (MÁS SUTIL) */}
      <div className="absolute -bottom-12 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[14rem] font-bold leading-none whitespace-nowrap -mb-10 text-white font-serif">
          ESTILO & CALIDAD
        </h2>
      </div>
    </footer>
  );
};

export default Footer;