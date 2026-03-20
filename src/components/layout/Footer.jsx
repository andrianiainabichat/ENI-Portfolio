import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Footer corrigé :
  - Colonne 1 : identité + contacts officiels ENI
  - Colonne 2 : navigation interne + 5 mentions
  - Colonne 3 (NOUVEAU) : widget "Terminal ENI" animé — affiche des
    stats en live style terminal avec typage, effet matrice, score
    des mentions, indicateurs. Innovant et dans le thème tech.
*/

const TERMINAL_LINES = [
  { delay:0,    color:"text-green-400", text:"> Connexion au serveur ENI..." },
  { delay:800,  color:"text-slate-400", text:"  Établissement : École Nationale d'Informatique" },
  { delay:1400, color:"text-slate-400", text:"  Ville         : Fianarantsoa, Madagascar" },
  { delay:2000, color:"text-green-400", text:"> Chargement des statistiques..." },
  { delay:2600, color:"text-yellow-400",text:"  [✓] Diplômés formés  .....  5000+" },
  { delay:3100, color:"text-yellow-400",text:"  [✓] Taux d'insertion ......   90%" },
  { delay:3600, color:"text-yellow-400",text:"  [✓] Mentions actives  ......    5" },
  { delay:4100, color:"text-yellow-400",text:"  [✓] Centres d'examen  .....   10" },
  { delay:4700, color:"text-green-400", text:"> Fondation : 1983 — 40+ ans d'excellence" },
  { delay:5300, color:"text-green-300", text:"  ★★★★★ 4.8/5 — Google Maps (25 avis)" },
  { delay:5900, color:"text-slate-500", text:"  Rang : #1 Informatique en Afrique (1983)" },
  { delay:6500, color:"text-green-400", text:"> Système prêt. Bienvenue à l'ENI ▌" },
];

function TerminalWidget() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [started,      setStarted]      = useState(false);

  useEffect(() => {
    if (!started) return;
    TERMINAL_LINES.forEach(line => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
      }, line.delay);
    });
  }, [started]);

  // Restart loop
  useEffect(() => {
    const restart = setInterval(() => {
      setVisibleLines([]);
      setStarted(false);
      setTimeout(() => setStarted(true), 300);
    }, 10000);
    return () => clearInterval(restart);
  }, []);

  // Start on mount
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="glass rounded-2xl overflow-hidden border border-green-500/15 h-full"
      style={{ minHeight:280 }}
    >
      {/* Barre titre terminal */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8"
        style={{ background:"rgba(0,0,0,.3)" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="font-mono text-[9px] text-slate-500 ml-2 tracking-widest uppercase">
          eni-system — bash
        </span>
      </div>

      {/* Corps terminal */}
      <div className="p-4 font-mono text-[10px] leading-6 space-y-0.5 overflow-hidden"
        style={{ minHeight:240 }}>
        <AnimatePresence>
          {visibleLines.map((line, i) => (
            <motion.div
              key={i + line.text}
              initial={{ opacity:0, x:-8 }}
              animate={{ opacity:1, x:0 }}
              transition={{ duration:.25 }}
              className={`${line.color} whitespace-nowrap overflow-hidden`}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Curseur clignotant si pas encore tout affiché */}
        {visibleLines.length < TERMINAL_LINES.length && started && (
          <motion.span
            animate={{ opacity:[1, 0] }}
            transition={{ duration:.6, repeat:Infinity, repeatType:"reverse" }}
            className="text-green-400 inline-block"
          >
            ▌
          </motion.span>
        )}
      </div>
    </div>
  );
}

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  const sections = [
    { label:"Accueil",        id:"hero" },
    { label:"À Propos",       id:"about" },
    { label:"Formations",     id:"formations" },
    { label:"Vie Étudiante",  id:"vie-etudiante" },
    { label:"Partenaires",    id:"partenaires" },
    { label:"Statistiques",   id:"statistiques" },
    { label:"Contact",        id:"contact" },
  ];

  const mentions = [
    { code:"GB",   label:"Génie Logiciel & Bases de Données" },
    { code:"SR",   label:"Administration Systèmes & Réseaux" },
    { code:"IG",   label:"Informatique Générale" },
    { code:"MDil", label:"Métiers du Digital" },
    { code:"IA",   label:"Intelligence Artificielle" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5" style={{ background:"#020c06" }}>
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/35 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* ── Col 1 : Identité ENI ── */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logos/eni-logo.png" alt="Logo ENI" className="w-12 h-12 object-contain flex-shrink-0" />
              <div>
                <div className="font-display font-black text-base grad-r glow-text-r leading-tight">ENI Madagascar</div>
                <div className="font-mono text-[8px] text-green-400/50 tracking-widest uppercase">École Nationale d'Informatique</div>
              </div>
            </div>

            <p className="font-body text-xs text-slate-500 leading-relaxed mb-5">
              Pépinière des élites informaticiennes malagasy.<br/>
              Rattachée à l'Université de Fianarantsoa.<br/>
              BP 1487 – 301 Fianarantsoa, Madagascar.
            </p>

            <div className="space-y-2">
              <a href="mailto:eni@eni.mg" data-hover
                className="flex items-center gap-2 font-mono text-xs text-green-400 hover:text-green-300 transition-colors">
                <span>✉</span> eni@eni.mg
              </a>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                <span>📞</span> +261 34 05 733 36
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                <span>📞</span> +261 32 15 204 28
              </div>
              <a href="https://eni.mg" target="_blank" rel="noopener noreferrer" data-hover
                className="flex items-center gap-2 font-mono text-xs text-green-400 hover:text-green-300 transition-colors">
                <span>🌐</span> www.eni.mg ↗
              </a>
            </div>
          </div>

          {/* ── Col 2 : Navigation ── */}
          <div>
            <div className="font-display font-bold text-white text-sm mb-4">#5 Mentions</div>
            <ul className="space-y-2">
              {mentions.map(m => (
                <li key={m.code} className="flex items-start gap-2">
                  <span className="font-mono text-[9px] text-green-500 font-bold flex-shrink-0 mt-0.5 w-8">{m.code}</span>
                  <span className="font-body text-xs text-slate-500 leading-relaxed">{m.label}</span>
                </li>
              ))}
            </ul>

            <motion.a href="https://eni.mg" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }} data-hover
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl font-display font-bold text-xs text-white bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400 transition-all">
              Visiter eni.mg ↗
            </motion.a>
          </div>

          {/* ── Col 3-4 : Terminal widget ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="font-display font-bold text-white text-sm">Système ENI</div>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-[8px] text-green-400 uppercase tracking-widest">En ligne</span>
              </span>
            </div>
            <TerminalWidget />
          </div>
        </div>

        {/* ── Barre bas ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-7 border-t border-white/5">
          <div className="font-mono text-[10px] text-slate-600 text-center sm:text-left">
            © 2024 ENI Madagascar — École Nationale d'Informatique · Université de Fianarantsoa
          </div>
          <div className="font-mono text-[10px] text-slate-600">
            Fianarantsoa · Madagascar
          </div>
        </div>
      </div>
    </footer>
  );
}