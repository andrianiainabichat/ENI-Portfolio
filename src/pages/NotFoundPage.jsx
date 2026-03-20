import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 cyber-grid" style={{ background:"#020c06" }}>
      <motion.div initial={{ opacity:0, scale:.85 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.6, ease:"backOut" }}>
        <img src="/logos/eni-logo.png" alt="ENI" className="w-20 h-20 object-contain mx-auto mb-6 animate-float" />
        <div className="font-display font-black leading-none grad-g opacity-20 select-none" style={{ fontSize:"clamp(80px,18vw,160px)" }}>404</div>
        <div className="font-mono text-xs tracking-[.28em] text-green-400 uppercase mb-3">Page introuvable</div>
        <h1 className="font-display font-black text-3xl text-white mb-4">Oops, cette page n'existe pas</h1>
        <p className="font-body text-slate-400 mb-10 max-w-md mx-auto text-sm">
          La page que vous cherchez a peut-être été déplacée ou supprimée.
          Revenez à l'accueil pour explorer le site ENI.
        </p>
        <Link to="/" data-hover>
          <motion.span whileHover={{ scale:1.05 }} whileTap={{ scale:.97 }}
            className="inline-block px-8 py-4 rounded-xl font-display font-bold text-white bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400 transition-all">
            ← Retour à l'accueil
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}
