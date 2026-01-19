"use client";
import { useState } from "react";
import { Menu, X, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import logo from "@/assets/logo-husheniid.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) setIsScrolled(true);
    else setIsScrolled(false);
  });

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Conócenos", href: "#conocenos" },
    { name: "Portafolio", href: "#portafolio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Contáctenos", href: "#contacto" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-center">
        {/* Nav Container con estética Premium */}
        <nav 
          className={`flex items-center justify-between w-full max-w-6xl px-6 transition-all duration-500 rounded-[2rem] border ${
            isScrolled 
              ? "h-16 bg-white/90 backdrop-blur-xl border-[#DBD8D3] shadow-xl shadow-[#524F4A]/5" 
              : "h-20 bg-transparent border-transparent"
          }`}
        >
          {/* Logo Rectangular Ajustado */}
          <a href="/" className="flex items-center group overflow-hidden">
            <motion.img
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              src={logo}
              alt="Husheniid - Muebles de Melamina"
              className={`w-auto object-contain transition-all duration-500 filter group-hover:brightness-110 ${
                isScrolled 
                  ? "h-11 md:h-12" 
                  : "h-14 md:h-18 lg:h-20" 
              }`}
            />
          </a>

          {/* Desktop Navigation - Acento Dorado Arena */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-bold transition-colors group ${
                  isScrolled ? "text-[#524F4A]" : "text-[#524F4A]" 
                } hover:text-[#BB9E7A]`}
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-[#BB9E7A] transition-all duration-300 -translate-x-1/2 rounded-full group-hover:w-4" />
              </a>
            ))}
          </div>

          {/* Actions: Estilo Gris Carbón y Dorado */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button 
                asChild 
                variant="ghost" 
                className="rounded-full font-bold hover:bg-[#DBD8D3]/30 hover:text-[#BB9E7A] text-[#524F4A]"
              >
                <a href="/login" className="flex items-center gap-2">
                  <User size={18} />
                  Ingresar
                </a>
              </Button>
            </div>

            <Button 
              asChild 
              className="hidden lg:flex rounded-full bg-[#524F4A] hover:bg-[#BB9E7A] text-white px-8 transition-all duration-500 group shadow-lg shadow-[#524F4A]/10"
            >
              <a href="#contacto" className="flex items-center gap-2">
                Cotizar ahora
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-3 text-[#524F4A] bg-[#DBD8D3]/50 rounded-2xl hover:bg-[#BB9E7A] hover:text-white transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay - Coherencia Bicolor */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/98 backdrop-blur-3xl border-b border-[#DBD8D3] overflow-hidden"
          >
            <div className="container mx-auto px-8 py-12 flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold text-[#524F4A] hover:text-[#BB9E7A] transition-colors font-serif italic"
                >
                  {link.name}
                </motion.a>
              ))}
              <hr className="border-[#DBD8D3]" />
              <div className="flex flex-col gap-4 pb-8">
                <Button asChild variant="outline" className="h-14 rounded-2xl border-[#524F4A] text-[#524F4A] text-lg font-bold">
                  <a href="/login">Área de Clientes</a>
                </Button>
                <Button asChild className="h-14 rounded-2xl bg-[#524F4A] hover:bg-[#BB9E7A] text-white text-lg font-bold transition-all">
                  <a href="#contacto">Solicitar Presupuesto</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;