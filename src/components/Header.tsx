import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-husheniid.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Conócenos", href: "#conocenos" },
    { name: "Portafolio", href: "#portafolio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Ubícanos", href: "#ubicacion" },
    { name: "Contáctenos", href: "#contacto" },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Husheniid"
              loading="lazy"
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                whileHover={{ scale: 1.1, color: "#ffffff" }} // color hover animado
                className="text-sm font-medium text-foreground transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild variant="default" size="default">
              <a href="/login">Iniciar Sesión</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 border-t border-border"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ scale: 1.05, color: "#ffffff" }}
                    className="text-sm font-medium text-foreground py-2 transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.05, color: "#ffffff" }}
                  className="text-sm font-medium text-foreground py-2 transition-colors"
                >
                  Iniciar Sesión
                </motion.a>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
