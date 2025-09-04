import { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { data, loading } = useData();
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

  const menuItems = [
    ["Home", "Accueil"],
    ["About", "À propos"],
    ["Skills", "Compétences"],
    ["Portfolio", "Portfolio"],
    ["Contact", "Contact"],
  ];

  if (loading) return null;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between h-14 px-6 md:px-10 lg:px-24 transition-colors duration-300 ${
        scrolled ? "bg-backgroundNavbar/10 backdrop-blur-sm text-foreground" : "bg-transparent text-white"
      }`}
    >
      {/* Logo */}
      <a
        href="#home"
        onClick={closeMenu}
        className="text-2xl font-bold hover:scale-105 transition-transform duration-200 z-50"
      >
        <span className="text-gold">Seb</span>.dev
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-10">
        <ul className="flex gap-6 text-sm">
          {menuItems.map(([en, fr], i) => (
            <li key={i}>
              <a
                href={`#${en.toLowerCase()}`}
                className="uppercase hover:text-gold hover:font-semibold transition-all duration-200"
              >
                {language ? en : fr}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme & Language Toggles */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setDark(!dark)}
            className="text-gold hover:scale-110 transition-transform duration-200 cursor-pointer"
          >
            {dark ? <Sun /> : <Moon />}
          </button>

          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="group w-12 h-6 bg-gold rounded-full border border-gold relative cursor-pointer  hover:bg-transparent hover:border-gold transition-all duration-300"
          >
            <span
              className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-medium text-white  transition-all duration-300 group-hover:text-gold ${
                language ? "left-2" : "right-2"
              }`}
            >
              {language ? "FR" : "EN"}
            </span>
            <div
              className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white group-hover:bg-gold rounded-full shadow transition-all duration-300 ${
                language ? "translate-x-[1.5rem]" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      {/* <button
        onClick={toggleMenu}
        className={`md:hidden z-50 hover:scale-110 transition-transform duration-300"
        aria-label="Toggle menu ${
                menuOpen && "text-wite"
              }`}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button> */}

      <button
        onClick={toggleMenu}
        className={`${menuOpen && "text-foreground"} md:hidden z-50 hover:scale-110 transition-transform duration-300`}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sliding Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-screen bg-backgroundNavbarOpen text-foreground flex flex-col justify-center items-center gap-10 z-40"
          >
            <ul className="flex flex-col items-center gap-6 text-lg">
              {menuItems.map(([en, fr], index) => (
                <li key={index}>
                  <a
                    href={`#${en.toLowerCase()}`}
                    onClick={closeMenu}
                    className="uppercase hover:text-gold hover:font-semibold transition-all duration-200"
                  >
                    {language ? en : fr}
                  </a>
                </li>
              ))}
            </ul>

            {/* Theme & Language Toggles in Mobile */}
            <div className="flex items-center gap-6 mt-4">
              <button
                onClick={() => setDark(!dark)}
                className="text-gold hover:scale-110 transition-transform duration-200"
              >
                {dark ? <Sun /> : <Moon />}
              </button>
              <button
                onClick={toggleLanguage}
                className="w-12 h-6 bg-gold rounded-full border border-gold relative cursor-pointer hover:bg-transparent hover:border-white transition-all duration-300"
              >
                <span
                  className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-medium text-white transition-all duration-300 ${
                    language ? "left-2" : "right-2"
                  }`}
                >
                  {language ? "FR" : "EN"}
                </span>
                <div
                  className={`absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                    language ? "translate-x-[1.5rem]" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
