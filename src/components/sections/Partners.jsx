import { motion } from "framer-motion";

// ── Partenaires officiels ENI (logos uploadés) ────────────
const partenaires = [
  { name:"MESUPRES",  src:"/logos/mesupres.png",  type:"Ministère de tutelle",          bg:"white" },
  { name:"AUF",       src:"/logos/auf.png",        type:"Agence Universitaire Francophonie", bg:"white" },
  { name:"Axian",     src:"/logos/axian.png",      type:"Groupe Télécom & Digital",      bg:"#e51b1b" },
  { name:"Ambatovy",  src:"/logos/ambatovy.jpg",   type:"Entreprise industrielle",        bg:"white" },
  { name:"RELiA",     src:"/logos/relia.jpg",      type:"Solutions informatiques",        bg:"white" },
  { name:"Hellotana", src:"/logos/hellotana.jpg",  type:"Startup Digital Madagascar",    bg:"white" },
  { name:"BIANCO",    src:"/logos/bianco.png",     type:"Bureau Anti-Corruption",        bg:"white" },
  { name:"BNGRC",     src:"/logos/bngrc.png",      type:"Gestion des Risques & Catastrophes", bg:"#f5a623" },
  { name:"INSTAT",    src:"/logos/instat.png",     type:"Institut Nat. Statistique",     bg:"white" },
];

export default function Partners() {
  return (
    <section id="partenaires" className="relative py-28 overflow-hidden" style={{ background:"#071a0e" }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 mb-14">
        <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center">
          <span className="font-mono text-[10px] tracking-[.28em] text-green-400 uppercase block mb-4">05 / Écosystème</span>
          <h2 className="font-display font-black text-white mb-5" style={{ fontSize:"clamp(30px,5vw,52px)" }}>
            Partenaires & <span className="grad-g">Institutions</span>
          </h2>
          <p className="font-body text-base text-slate-400 max-w-2xl mx-auto">
            L'ENI collabore avec des entreprises, ministères et organisations internationales
            pour garantir la qualité de sa formation et l'insertion professionnelle de ses diplômés.
          </p>
        </motion.div>
      </div>

      {/* ── Carousel infini ── */}
      <div className="relative overflow-hidden mb-14">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#071a0e] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#071a0e] to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x:["0%","-50%"] }}
          transition={{ duration:30, ease:"linear", repeat:Infinity }}
        >
          {[...partenaires, ...partenaires].map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale:1.06, boxShadow:"0 0 22px rgba(34,197,94,.35)" }}
              className="logo-card flex-shrink-0 group relative"
              style={{ width:160 }}
              data-hover
            >
              <img src={p.src} alt={p.name} className="max-h-14 max-w-[130px] object-contain" />
              {/* Tooltip */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap
                font-mono text-[9px] text-slate-300 bg-dark-800/95 px-3 py-1.5 rounded-lg
                opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20
                border border-white/10">
                {p.type}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Grid détaillée ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-3 lg:grid-cols-3 gap-5 mb-12">
          {[
            { v:"70%", l:"des employés de RELiA sont diplômés ENI",    icon:"👔" },
            { v:"10",  l:"centres d'examen à travers Madagascar",        icon:"🗺️" },
            { v:"50+", l:"entreprises partenaires actives",              icon:"🏢" },
          ].map((s,i) => (
            <motion.div key={i} initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.12 }}
              className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="font-display font-black text-3xl grad-g mb-2">{s.v}</div>
              <div className="font-body text-xs text-slate-400 leading-relaxed">{s.l}</div>
            </motion.div>
          ))}
        </div>

        {/* Partenaires détaillés */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {partenaires.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*.07 }}
              whileHover={{ y:-5 }}
              className="glass rounded-2xl p-5 flex items-center gap-4 group cursor-pointer"
              data-hover>
              <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0 p-2 group-hover:shadow-[0_0_15px_rgba(34,197,94,.3)] transition-all">
                <img src={p.src} alt={p.name} className="max-h-12 max-w-12 object-contain" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-sm">{p.name}</div>
                <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mt-1">{p.type}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
