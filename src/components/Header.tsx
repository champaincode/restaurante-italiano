import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import logoBlack from "../assets/logonegro.png";
import logoWhite from "../assets/logoblanco.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const themeClasses = isScrolled
    ? "bg-black border-black/10 text-white"
    : "bg-white border-gray-100 text-black";

  const headerClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b py-2 ${
    isScrolled ? "md:pt-6 md:pb-3" : "md:py-4"
  } ${themeClasses}`;

  const navLinkClasses = `text-sm tracking-widest transition-colors font-medium hover:opacity-70`;

  const buttonClasses = `px-6 py-2 transition-all duration-300 text-sm tracking-widest font-semibold ${
    isScrolled
      ? "bg-white text-black hover:bg-gray-200"
      : "bg-black text-white hover:bg-gray-800"
  }`;

  const navLinks = [
    { name: "INICIO", path: "/" },
    { name: "CARTA", path: "/carta" },
    { name: "GALERÍA", path: "/galeria" },
    { name: "CONTACTO", path: "/#contacto" },
  ];

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Desktop layout ── */}
        <div className="hidden md:flex items-center justify-between min-h-[4rem]">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              src={isScrolled ? logoWhite : logoBlack}
              alt="Il Borsalino - Restaurante & Pizzería"
              className={`w-auto transition-all duration-300 origin-left object-contain ${
                isScrolled ? "h-20" : "h-12"
              }`}
            />
          </Link>
          <div className="flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navLinks.map((item) => (
                <a key={item.name} href={item.path} className={navLinkClasses}>
                  {item.name}
                </a>
              ))}
            </nav>
            <Link to="/reservas">
              <button className={buttonClasses}>RESERVAR</button>
            </Link>
          </div>
        </div>

        {/* ── Mobile layout: 3-col grid so logo stays perfectly centered ── */}
        <div
          className="md:hidden relative flex items-center justify-center transition-all duration-300 min-h-[3.5rem]"
        >
          {/* Hamburger absolute left & center-y */}
          <button
            className={`absolute left-0 p-2 rounded-full transition-colors ${
              isScrolled ? "hover:bg-white/10" : "hover:bg-black/5"
            }`}
            style={{ top: "50%", transform: "translateY(-50%)" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo centered */}
          <div className="flex justify-center flex-shrink-0 items-center">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center"
            >
              <img
                src={isScrolled ? logoWhite : logoBlack}
                alt="Il Borsalino"
                style={{ height: '28px', width: 'auto' }}
                className="transition-all duration-300 object-contain"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`md:hidden border-t overflow-hidden ${themeClasses}`}
          >
            <nav className="px-6 py-8 space-y-6">
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`block text-lg ${navLinkClasses}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Reservar CTA inside mobile menu */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="pt-4 border-t border-current/10"
              >
                <Link to="/reservas" onClick={() => setIsMenuOpen(false)}>
                  <button
                    className={`w-full py-3 text-center ${buttonClasses}`}
                  >
                    RESERVAR MESA
                  </button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
