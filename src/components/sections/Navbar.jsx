import { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { loading } = useData();
  const { dark, setDark } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleLanguage = () => setLanguage((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight - 35;
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const menuItems = [
    ["Home", "Accueil"],
    ["About", "À propos"],
    ["Skills", "Compétences"],
    ["Portfolio", "Portfolio"],
    ["Contact", "Contact"],
  ];

  const navLinkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  const mobileMenuVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.08, duration: 0.4, ease: "easeOut" },
    }),
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  if (loading) return null;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between h-16 px-6 md:px-12 lg:px-24 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-foreground/5 text-foreground"
          : "bg-transparent text-white"
      }`}
    >
      {/* Logo */}
      <a
        href="#home"
        onClick={closeMenu}
        className="relative text-2xl font-bold z-50 group"
      >
        <span className={`text-gold transition-colors duration-300 ${scrolled || menuOpen ? "group-hover:text-foreground" : "group-hover:text-white"}`}>Seb</span>
        <span className={`transition-colors duration-300 group-hover:text-gold ${menuOpen ? "text-foreground" : ""}`}>.dev</span>
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-12">
        <ul className="flex gap-8">
          {menuItems.map(([en, fr], i) => (
            <motion.li
              key={i}
              custom={i}
              variants={navLinkVariants}
              initial="initial"
              animate="animate"
            >
              <a
                href={`#${en.toLowerCase()}`}
                className="relative text-sm font-medium tracking-wide uppercase py-1 group"
              >
                <span className="transition-colors duration-300 group-hover:text-gold">
                  {language ? en : fr}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Theme & Language Toggles */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative p-2 rounded-full text-gold hover:bg-gold/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
          >
            <motion.div
              key={dark ? "sun" : "moon"}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </button>

          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            aria-label={language ? "Switch to French" : "Switch to English"}
            className="relative flex items-center gap-1 px-3 py-1.5 rounded-full border border-gold/30 hover:border-gold text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
          >
            <span className={`transition-colors duration-300 ${language ? "text-gold underline underline-offset-4 decoration-1" : "text-foreground/50"}`}>
              EN
            </span>
            <span className="text-foreground/30">/</span>
            <span className={`transition-colors duration-300 ${!language ? "text-gold underline underline-offset-4 decoration-1" : "text-foreground/50"}`}>
              FR
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        className={`md:hidden z-50 p-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 ${
          menuOpen ? "text-foreground" : ""
        }`}
      >
        <motion.div
          initial={false}
          animate={{ rotate: menuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </button>

      {/* Mobile Sliding Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-screen bg-background/95 backdrop-blur-lg text-foreground flex flex-col justify-center items-center z-40"
          >
            <nav className="flex flex-col items-center gap-8">
              {menuItems.map(([en, fr], index) => (
                <motion.a
                  key={index}
                  custom={index}
                  variants={mobileMenuVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  href={`#${en.toLowerCase()}`}
                  onClick={closeMenu}
                  className="relative text-2xl font-medium tracking-wide uppercase group"
                >
                  <span className="transition-colors duration-300 group-hover:text-gold">
                    {language ? en : fr}
                  </span>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </nav>

            {/* Theme & Language Toggles in Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex items-center gap-6 mt-12"
            >
              <button
                onClick={() => setDark(!dark)}
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                className="p-3 rounded-full text-gold hover:bg-gold/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                {dark ? <Sun size={24} /> : <Moon size={24} />}
              </button>

              <button
                onClick={toggleLanguage}
                aria-label={language ? "Switch to French" : "Switch to English"}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 hover:border-gold text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                <span className={`transition-all duration-300 ${language ? "text-gold" : "text-foreground/50"}`}>
                  EN
                </span>
                <span className="text-foreground/30">/</span>
                <span className={`transition-all duration-300 ${!language ? "text-gold" : "text-foreground/50"}`}>
                  FR
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
