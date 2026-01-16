"use client";
import { useState, useEffect } from "react";
import { Menu, X, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import logo from "@/assets/logo-husheniid.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Cambiar estilo del header al hacer scroll
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
        {/* Nav Container con efecto Glassmorphism */}
        <nav 
          className={`flex items-center justify-between w-full max-w-6xl px-6 transition-all duration-500 rounded-[2rem] border ${
            isScrolled 
              ? "h-16 bg-white/80 backdrop-blur-xl border-slate-200 shadow-lg shadow-slate-200/50" 
              : "h-20 bg-transparent border-transparent"
          }`}
        >
          {/* Logo con escala dinámica */}
          <a href="/" className="flex items-center group">
            <motion.img
              src={logo}
              alt="Husheniid"
              className={`w-auto transition-all duration-500 ${
                isScrolled ? "h-10" : "h-12 md:h-14"
              }`}
            />
          </a>

          {/* Desktop Navigation - Links con indicador inferior */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-orange-600 transition-all duration-300 -translate-x-1/2 rounded-full group-hover:w-4" />
              </a>
            ))}
          </div>

          {/* Actions: Login + Menu Mobile */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button 
                asChild 
                variant="ghost" 
                className="rounded-full font-bold hover:bg-orange-50 hover:text-orange-600"
              >
                <a href="/login" className="flex items-center gap-2">
                  <User size={18} />
                  Ingresar
                </a>
              </Button>
            </div>

            <Button 
              asChild 
              className="hidden lg:flex rounded-full bg-slate-950 hover:bg-orange-600 text-white px-6 transition-all group"
            >
              <a href="#contacto" className="flex items-center gap-2">
                Cotizar ahora
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-slate-900 bg-slate-100 rounded-xl hover:bg-orange-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-100 overflow-hidden"
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
                  className="text-3xl font-bold text-slate-900 hover:text-orange-600 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <hr className="border-slate-100" />
              <div className="flex flex-col gap-4">
                <Button asChild variant="outline" className="h-14 rounded-2xl border-slate-200 text-lg font-bold">
                  <a href="/login">Área de Clientes</a>
                </Button>
                <Button asChild className="h-14 rounded-2xl bg-orange-600 text-lg font-bold">
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