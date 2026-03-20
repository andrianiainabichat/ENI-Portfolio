import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done,     setDone]     = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setTimeout(() => { setDone(true); onComplete?.(); }, 400); return 100; }
        return p + Math.random() * 14;
      });
    }, 80);
    return () => clearInterval(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background:"#020c06" }}
          exit={{ opacity:0, scale:1.04 }}
          transition={{ duration:.55, ease:"easeInOut" }}
        >
          {/* Logo ENI officiel */}
          <motion.div initial={{ opacity:0, scale:.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:.1, type:"spring" }} className="mb-8">
            <img src="/logos/eni-logo.png" alt="ENI Logo" className="w-24 h-24 object-contain animate-float" />
          </motion.div>

          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.3 }} className="text-center mb-10">
            <div className="font-display font-black text-4xl grad-r glow-text-r mb-1">ENI</div>
            <div className="font-mono text-xs tracking-[.35em] text-green-400/60 uppercase">École Nationale d'Informatique</div>
            <div className="font-mono text-[10px] text-slate-500 mt-1">Université de Fianarantsoa · Madagascar</div>
          </motion.div>

          {/* Spinner hexagonal */}
          <motion.div className="relative w-16 h-16 mb-8" animate={{ rotate:360 }} transition={{ duration:3, repeat:Infinity, ease:"linear" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs><linearGradient id="hexL" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22c55e"/><stop offset="100%" stopColor="#4ade80"/></linearGradient></defs>
              <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" fill="none" stroke="url(#hexL)" strokeWidth="3.5"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-green-400">{Math.min(100,Math.round(progress))}%</span>
            </div>
          </motion.div>

          <div className="w-60 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full loader-bar rounded-full transition-all duration-100" style={{ width:`${Math.min(100,progress)}%` }} />
          </div>
          <motion.p className="mt-4 font-mono text-[10px] text-slate-500 tracking-widest uppercase" animate={{ opacity:[.4,1,.4] }} transition={{ duration:2, repeat:Infinity }}>
            Chargement en cours...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
