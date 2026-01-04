import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Variants
  const topVariants = { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
  const leftVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
  const rightVariants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
  const bottomVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={topVariants}
          >
            <h3 className="text-2xl font-heading font-bold mb-4">Husheniid</h3>
            <p className="text-primary-foreground/80 mb-4">
              Fabricación de muebles de melamina a medida con calidad superior y atención personalizada.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={leftVariants}
          >
            <h4 className="font-heading font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#portafolio" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Portafolio
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#conocenos" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Conócenos
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={rightVariants}
          >
            <h4 className="font-heading font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-secondary" />
                <a href="tel:+51999999999" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  +51 999 999 999
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-secondary" />
                <a href="mailto:contacto@Husheniid.com" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  contacto@Husheniid.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-1" />
                <span className="text-primary-foreground/80">
                  Av. Principal 123<br />Huancayo, Perú
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Social & Hours */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={bottomVariants}
          >
            <h4 className="font-heading font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <h4 className="font-heading font-semibold mb-2">Horario</h4>
            <p className="text-primary-foreground/80 text-sm">
              Lun - Vie: 9:00 AM - 6:00 PM<br />
              Sábado: 9:00 AM - 1:00 PM
            </p>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-primary-foreground/10 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
        >
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Husheniid. Tu mejor opción en muebles de melamina a medida.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
