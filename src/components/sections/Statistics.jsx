import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { v:1983,  sfx:"",  label:"Année de fondation",   icon:"🏛️", sub:"Pionnière en Afrique",         isYear:true },
  { v:5000,  sfx:"+", label:"Diplômés formés",       icon:"🎓", sub:"Ingénieurs & Techniciens" },
  { v:90,    sfx:"%", label:"Taux d'insertion",      icon:"💼", sub:"Dans les 6 premiers mois" },
  { v:975,   sfx:"+", label:"Places au concours",    icon:"📋", sub:"Par session (5 mentions)" },
  { v:10,    sfx:"",  label:"Centres d'examen",      icon:"🗺️", sub:"À travers Madagascar" },
  { v:5,     sfx:"",  label:"Mentions",              icon:"📚", sub:"Niveaux L, M, Doctorat" },
  { v:40,    sfx:"+", label:"Années d'excellence",   icon:"⭐", sub:"Depuis 1983" },
  { v:9,     sfx:"",  label:"Partenaires officiels", icon:"🤝", sub:"Ambatovy, Axian, AUF…" },
  { v:3,     sfx:"",  label:"Niveaux de diplôme",    icon:"🏆", sub:"Licence · Master · Doctorat" },
];

function StatCard({ stat, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, scale:.82 }}
      animate={inView ? { opacity:1, scale:1 } : {}}
      transition={{ duration:.5, delay:index*.09, ease:"backOut" }}
      whileHover={{ y:-5, boxShadow:"0 0 28px rgba(34,197,94,.28)" }}
      className="glass rounded-2xl p-7 text-center group relative overflow-hidden"
      data-hover
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">{stat.icon}</div>
        <div className="font-display font-black text-4xl grad-g mb-2">
          {inView
            ? <CountUp end={stat.v} duration={2.4} suffix={stat.sfx} useEasing separator=" " />
            : `0${stat.sfx}`
          }
        </div>
        <div className="font-display font-bold text-white text-sm mb-1">{stat.label}</div>
        <div className="font-mono text-[9px] text-slate-500">{stat.sub}</div>
      </div>
    </motion.div>
  );
}

export default function Statistics() {
  return (
    <section id="statistiques" className="relative py-28 overflow-hidden" style={{ background:"#0f2d18" }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
      <div className="absolute inset-0 cyber-grid opacity-25" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-600/4 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
          <span className="font-mono text-[10px] tracking-[.28em] text-green-400 uppercase block mb-4">04 / Chiffres clés</span>
          <h2 className="font-display font-black text-white mb-5" style={{ fontSize:"clamp(30px,5vw,52px)" }}>
            ENI en <span className="grad-g">Chiffres</span>
          </h2>
          <p className="font-body text-base text-slate-400 max-w-xl mx-auto">
            Quatre décennies de formation d'excellence — mesurées en impact réel sur le numérique malagasy.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-14">
          {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>

        {/* Citation officielle */}
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.2 }}
          className="glass-dark rounded-3xl p-10 glow-border text-center relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute top-4 left-8 font-display font-black text-[80px] text-green-500/8 leading-none">"</div>
          <p className="relative font-body text-lg text-slate-300 leading-relaxed italic mb-6 max-w-3xl mx-auto">
            L'ENI est la pépinière des élites informaticiennes malagasy. Nous formons des professionnels
            créatifs et éthiques, prêts à exceller dans un monde numérique en constante évolution.
          </p>
          <div className="font-display font-bold text-white">Thomas Mahatody</div>
          <div className="font-mono text-[10px] text-green-400 tracking-widest uppercase mt-1">Directeur — École Nationale d'Informatique</div>
        </motion.div>
      </div>
    </section>
  );
}
