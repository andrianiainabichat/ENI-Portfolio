import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { gsap } from "gsap";
import ParticleBackground from "../ui/ParticleBackground";

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".h-badge",  { opacity:0, y:-22, duration:.8,  delay:.3,  ease:"power3.out" });
      gsap.from(".h-logo",   { opacity:0, scale:.7, duration:.9, delay:.4, ease:"back.out(1.7)" });
      gsap.from(".h-title",  { opacity:0, y:60,  duration:1,   delay:.55, ease:"power4.out" });
      gsap.from(".h-sub",    { opacity:0, y:36,  duration:.8,  delay:.9,  ease:"power3.out" });
      gsap.from(".h-cta",    { opacity:0, scale:.85, duration:.7, delay:1.15, ease:"back.out(1.7)" });
      gsap.from(".h-stat",   { opacity:0, y:28,  duration:.7,  delay:1.4, stagger:.13, ease:"power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid"
      style={{ background:"#020c06" }}
    >
      <ParticleBackground />

      {/* Orbs décoratifs */}
      <div className="absolute top-1/4 left-1/5 w-80 h-80 rounded-full bg-green-600/8 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-72 h-72 rounded-full bg-green-500/5 blur-[90px] pointer-events-none" />

      {/*
        ✅ FIX NAVBAR OVERLAP :
        pt-24  = 96px sur mobile  (hauteur navbar ~64px + marge)
        md:pt-28 = 112px sur desktop (navbar un peu plus haute quand scrollée)
        pb-16 pour l'espace bas avec l'indicateur scroll
      */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full pt-24 md:pt-28 pb-16">

        {/* Badge officiel */}
        <div className="h-badge inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
          <span className="font-mono text-[10px] text-slate-300 tracking-widest uppercase">
            Pépinière des élites informaticiennes malagasy · Fondée 1983
          </span>
        </div>

        {/* Logo officiel ENI flottant */}
        <div className="h-logo flex justify-center mb-6">
          <img
            src="/logos/eni-logo.png"
            alt="Logo officiel ENI"
            className="w-28 h-28 object-contain animate-float drop-shadow-[0_0_18px_rgba(34,197,94,.35)]"
          />
        </div>

        {/* Titre principal */}
        <h1 className="h-title font-display font-black leading-[.92] mb-4"
          style={{ fontSize:"clamp(36px,7vw,72px)" }}>
          <span className="block text-white">École Nationale</span>
          <span className="block grad-g">d'Informatique</span>
          <span className="block font-mono tracking-[.35em] grad-r glow-text-r mt-3 uppercase"
            style={{ fontSize:"clamp(10px,2vw,18px)" }}>
            ENI · Fianarantsoa · Madagascar
          </span>
        </h1>

        {/* Typing animation */}
        <div className="h-sub font-body text-lg md:text-xl text-slate-400 mb-10 h-10 flex items-center justify-center">
          <TypeAnimation
            sequence={[
              "Former une génération de professionnels créatifs et éthiques", 2500,
              "Génie Logiciel & Bases de Données", 2000,
              "Administration Systèmes & Réseaux", 2000,
              "Intelligence Artificielle & Data Science", 2000,
              "Métiers du Digital — MDil", 2000,
              "Être reconnus comme centre d'excellence en informatique", 2500,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ display:"inline-block" }}
          />
        </div>

        {/* CTA Buttons */}
        <div className="h-cta flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <motion.button
            whileHover={{ scale:1.05, boxShadow:"0 0 28px rgba(34,197,94,.55)" }}
            whileTap={{ scale:.97 }}
            onClick={() => scrollTo("formations")}
            data-hover
            className="relative px-8 py-4 rounded-xl font-display font-bold text-base overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-500" />
            <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-white flex items-center justify-center gap-2">
              Découvrir nos Formations
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </span>
          </motion.button>

          <motion.a
            href="https://eni.mg"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale:1.05 }}
            whileTap={{ scale:.97 }}
            data-hover
            className="px-8 py-4 rounded-xl font-display font-bold text-base glass glow-border text-white hover:bg-white/8 transition-colors text-center"
          >
            Site Officiel eni.mg ↗
          </motion.a>
        </div>

        {/* Statistiques rapides */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { v:"1983",  l:"Année de fondation" },
            { v:"5",     l:"Mentions proposées" },
            { v:"975+",  l:"Places / concours" },
            { v:"10",    l:"Centres d'examen" },
          ].map(s => (
            <div key={s.l} className="h-stat glass rounded-2xl px-5 py-3 text-center">
              <div className="font-display font-black text-xl grad-g">{s.v}</div>
              <div className="font-body text-[11px] text-slate-400 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}