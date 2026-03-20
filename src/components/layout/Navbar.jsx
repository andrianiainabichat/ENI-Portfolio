import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Accueil",       id: "hero" },
  { label: "À Propos",      id: "about" },
  { label: "Formations",    id: "formations" },
  { label: "Vie Étudiante", id: "vie-etudiante" },
  { label: "Statistiques",  id: "statistiques" },
  { label: "Partenaires",   id: "partenaires" },
  { label: "Contact",       id: "contact" },
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [active,      setActive]      = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setMobileOpen(false);
    setActive(id);
    setTimeout(() => scrollTo(id), 80);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-dark shadow-glow py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-4">
          {/* ── Logo officiel ENI ── */}
          <Link to="/" onClick={() => handleNav("hero")} className="flex items-center gap-3 group flex-shrink-0" data-hover>
            <img
              src="/logos/eni-logo.png"
              alt="Logo ENI"
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
            />
            <div>
              <div className="font-display font-black text-base grad-r glow-text-r leading-none">ENI</div>
              <div className="font-mono text-[8px] text-green-400/55 tracking-[.15em] uppercase leading-none mt-0.5">
                Université de Fianarantsoa
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                data-hover
                className={`relative px-3 py-2 font-body text-xs transition-colors group ${
                  active === link.id ? "text-green-400" : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-green-500 to-green-300 rounded-full transition-all duration-300 ${
                  active === link.id ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </button>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="https://eni.mg"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            data-hover
            className="hidden xl:inline-flex items-center gap-2 px-4 py-2 rounded-lg font-display font-bold text-xs text-white overflow-hidden relative group flex-shrink-0"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-500 group-hover:from-green-600 group-hover:to-green-400 transition-all" />
            <span className="relative">Site Officiel ↗</span>
          </motion.a>

          {/* Mobile */}
          <button className="xl:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} data-hover>
            {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass-dark flex flex-col items-center justify-center gap-5"
          >
            <img src="/logos/eni-logo.png" alt="ENI" className="w-16 h-16 object-contain mb-4" />
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleNav(link.id)}
                className="font-display font-bold text-xl text-slate-200 hover:text-green-400 transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
