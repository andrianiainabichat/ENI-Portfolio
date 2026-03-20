import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Données officielles ENI (eni.mg) ──────────────────────
const formations = [
  {
    id:"gb", icon:"💻", code:"GB",
    titre:"Génie Logiciel & Bases de Données",
    niveaux:"Licence Pro · Master Pro · Doctorat",
    places:"325 places (Fianarantsoa)",
    color:"from-green-700 to-emerald-500",
    glow:"rgba(34,197,94,.35)",
    desc:"Formation aux méthodes et outils de développement logiciel, architecture des systèmes d'information et gestion des bases de données. Stages obligatoires en entreprise.",
    competences:["Développement Web/Mobile","Architecture logicielle","SQL & NoSQL","Méthodes Agiles","DevOps & CI/CD","UML & Modélisation"],
    debouches:["Développeur Full-Stack","Architecte SI","Chef de projet IT","DevOps Engineer"],
  },
  {
    id:"sr", icon:"🌐", code:"SR",
    titre:"Administration Systèmes & Réseaux",
    niveaux:"Licence Pro · Master Pro",
    places:"325 places (Fianarantsoa)",
    color:"from-teal-700 to-green-500",
    glow:"rgba(20,184,166,.35)",
    desc:"Maîtrise de l'administration des systèmes informatiques et des réseaux de communication. Formation aux infrastructures cloud, à la virtualisation et à la cybersécurité.",
    competences:["Linux/Windows Server","TCP/IP & Protocoles","Cloud AWS/Azure","Virtualisation VMware","Sécurité réseau","VoIP & Téléphonie"],
    debouches:["Administrateur Sys/Réseau","Ingénieur Cloud","Architecte Infrastructure","Expert Cybersécurité"],
  },
  {
    id:"ig", icon:"📊", code:"IG",
    titre:"Informatique Générale",
    niveaux:"Licence Professionnelle",
    places:"325 places Fianarantsoa + 100 Toliara",
    color:"from-emerald-700 to-teal-500",
    glow:"rgba(5,150,105,.35)",
    desc:"Formation généraliste en informatique, couvrant la programmation, les systèmes d'information et la gestion de projets informatiques. Antenne ouverte à Toliara.",
    competences:["Programmation","Algorithmique","Bases de données","SI & ERP","Gestion de projets","Web & E-commerce"],
    debouches:["Développeur","Technicien SI","Gestionnaire de projets","Consultant informatique"],
  },
  {
    id:"mdi", icon:"📱", code:"MDi",
    titre:"Métiers du Digital",
    niveaux:"Licence Professionnelle",
    places:"200 places (Fianarantsoa)",
    color:"from-green-600 to-lime-500",
    glow:"rgba(101,163,13,.3)",
    desc:"Formation orientée vers les métiers émergents du numérique : design UX/UI, marketing digital, e-commerce et communication numérique. Mention la plus récente.",
    competences:["Design UX/UI","Marketing Digital","E-commerce","Community Management","SEO/SEA","Transformation digitale"],
    debouches:["UX/UI Designer","Digital Marketer","E-commerce Manager","Chef de projet digital"],
    badge:"Nouveau",
  },
  {
    id:"ia", icon:"🤖", code:"IA",
    titre:"Intelligence Artificielle",
    niveaux:"Master Pro · Doctorat",
    places:"Accès sur dossier (niveau Licence)",
    color:"from-green-500 to-yellow-500",
    glow:"rgba(132,204,22,.3)",
    desc:"Formation de pointe en IA avec deux parcours spécialisés : Gouvernance des données et Audit des Systèmes d'Information. Accessible après une Licence.",
    competences:["Machine Learning","Deep Learning","Data Science & Big Data","Gouvernance des données","Audit SI","Python & R"],
    debouches:["Data Scientist","ML Engineer","Auditeur SI","Chef de projet IA"],
    badge:"Master",
  },
];

// ── Carte formation ───────────────────────────────────────
function FormationCard({ f, index }) {
  const [hovered, setHovered] = useState(false);
  const [rotX,    setRotX]    = useState(0);
  const [rotY,    setRotY]    = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRotX(-((e.clientY - r.top)  / r.height - .5) * 11);
    setRotY( ((e.clientX - r.left) / r.width  - .5) * 11);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:55 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:.6, delay:index*.1 }}
      style={{
        transform:`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        boxShadow: hovered ? `0 20px 55px ${f.glow}` : "none",
        transition:"transform .3s ease, box-shadow .3s ease",
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setRotX(0); setRotY(0); }}
      className="glass rounded-3xl p-7 cursor-pointer group overflow-hidden relative"
      data-hover
    >
      {/* Top color bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${f.color} rounded-t-3xl`} />
      {/* BG glow on hover */}
      <div className={`absolute -top-10 -right-10 w-48 h-48 rounded-full bg-gradient-to-br ${f.color} blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{f.icon}</span>
            <div>
              <div className={`font-mono text-xs font-bold bg-gradient-to-r ${f.color} bg-clip-text text-transparent`}>{f.code}</div>
              <div className="font-mono text-[9px] text-slate-500">{f.niveaux}</div>
            </div>
          </div>
          {f.badge && (
            <span className="px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 font-mono text-[9px] text-green-400">{f.badge}</span>
          )}
        </div>

        <h3 className="font-display font-bold text-white text-lg mb-1 leading-snug">{f.titre}</h3>
        <div className="font-mono text-[10px] text-slate-500 mb-3">📍 {f.places}</div>
        <p className="font-body text-xs text-slate-400 leading-relaxed mb-4">{f.desc}</p>

        {/* Compétences */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {f.competences.map(c => (
            <span key={c} className="px-2 py-0.5 glass rounded font-mono text-[9px] text-slate-300">{c}</span>
          ))}
        </div>

        {/* Débouchés */}
        <div className="border-t border-white/5 pt-4">
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-2">Débouchés</div>
          <div className="flex flex-wrap gap-1.5">
            {f.debouches.map(d => (
              <span key={d} className={`px-2.5 py-1 rounded-lg text-xs font-body bg-gradient-to-r ${f.color} bg-opacity-10 text-white/80`}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Formations() {
  return (
    <section id="formations" className="relative py-28 overflow-hidden" style={{ background:"#020c06" }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/25 to-transparent" />
      <div className="absolute right-0 top-1/3 w-96 h-96 rounded-full bg-green-600/5 blur-[110px]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
          <span className="font-mono text-[10px] tracking-[.28em] text-green-400 uppercase block mb-4">02 / Programmes académiques</span>
          <h2 className="font-display font-black text-white mb-5" style={{ fontSize:"clamp(30px,5vw,52px)" }}>
            Nos <span className="grad-g">5 Mentions</span>
          </h2>
          <p className="font-body text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Cinq mentions spécialisées en système LMD pour former les professionnels du numérique
            malagasy et africain — avec stages obligatoires à chaque niveau.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-7">
          {formations.map((f, i) => <FormationCard key={f.id} f={f} index={i} />)}
        </div>

        {/* Admission info card */}
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="mt-14 glass rounded-3xl p-8 glow-border text-center">
          <h3 className="font-display font-bold text-white text-xl mb-4">Admission sur Concours</h3>
          <p className="font-body text-slate-400 text-sm mb-6 max-w-2xl mx-auto leading-relaxed">
            Le concours d'entrée est ouvert aux titulaires d'un <strong className="text-green-400">Baccalauréat C, D, S ou Technique</strong>,
            sans limite d'âge. Les épreuves se déroulent dans <strong className="text-green-400">10 centres d'examen</strong> à travers Madagascar
            (6 universités + 4 chefs-lieux de province).
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {["Bac Série C","Bac Série D","Bac Série S","Bac Technique","Sans limite d'âge","10 centres d'examen"].map(item => (
              <span key={item} className="px-4 py-2 glass rounded-full font-mono text-[10px] text-green-400 glow-border">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
