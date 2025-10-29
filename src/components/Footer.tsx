import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Demo</h3>
            <p className="text-primary-foreground/80 mb-4">
              Fabricación de muebles de melamina a medida con calidad superior y atención personalizada.
            </p>
          </div>

          {/* Quick Links */}
          <div>
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
          </div>

          {/* Contact Info */}
          <div>
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
                <a href="mailto:contacto@demo.com" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  contacto@demo.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-1" />
                <span className="text-primary-foreground/80">
                  Av. Principal 123<br />Lima, Perú
                </span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
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
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Demo. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
