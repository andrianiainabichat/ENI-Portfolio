import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function FadeIn({ children, delay = 0, x = 0 }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-70px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y: x ? 0 : 40, x }}
      animate={inView ? { opacity:1, y:0, x:0 } : {}}
      transition={{ duration:.7, delay, ease:"easeOut" }}
    >{children}</motion.div>
  );
}

const timeline = [
  { year:"1983", event:"Fondation de l'ENI — première école informatique d'Afrique" },
  { year:"1990", event:"Premiers diplômés recrutés à l'international" },
  { year:"2003", event:"Ouverture du cycle Doctorat (DEA)" },
  { year:"2010", event:"Adoption du système LMD (Licence-Master-Doctorat)" },
  { year:"2015", event:"Partenariats universitaires européens (France)" },
  { year:"2020", event:"Lancement de la mention Intelligence Artificielle" },
  { year:"2024", event:"Mention MDi — Métiers du Digital, 200 places" },
];

const valeurs = [
  { icon:"🎯", titre:"Excellence", desc:"Haut niveau académique et rigueur scientifique exigés à chaque niveau." },
  { icon:"💡", titre:"Innovation", desc:"Encourager la créativité, la pensée computationnelle et l'esprit entrepreneurial." },
  { icon:"⚖️", titre:"Éthique",    desc:"Former des professionnels éthiques, responsables dans le monde numérique." },
  { icon:"🤝", titre:"Partenariat",desc:"Liens forts avec les entreprises, l'industrie et les universités partenaires." },
  { icon:"🌍", titre:"Ouverture",  desc:"Mobilité étudiante valorisée, rayonnement international des diplômés." },
  { icon:"📚", titre:"Recherche",  desc:"Production de connaissances via les laboratoires de recherche appliquée." },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden" style={{ background:"#071a0e" }}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      <div className="absolute -left-40 top-20 w-96 h-96 rounded-full bg-green-600/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-18">
            <span className="font-mono text-[10px] tracking-[.28em] text-green-400 uppercase block mb-4">01 / Notre institution</span>
            <h2 className="font-display font-black text-white mb-5" style={{ fontSize:"clamp(30px,5vw,52px)" }}>
              À Propos de <span className="grad-r glow-text-r">l'ENI</span>
            </h2>
            <p className="font-body text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Établissement public d'enseignement supérieur rattaché à l'Université de Fianarantsoa,
              l'ENI est la pépinière des élites informaticiennes malagasy depuis 1983.
            </p>
          </div>
        </FadeIn>

        {/* Mission + Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <FadeIn delay={.1} x={-30}>
            <div className="glass rounded-3xl p-8 glow-border h-full">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-display font-bold text-white text-xl mb-3">Mission</h3>
              <p className="font-body text-slate-400 leading-relaxed text-sm">
                Former une génération de professionnels de l'informatique <strong className="text-green-400">créatifs et éthiques</strong>,
                prêts à exceller dans un monde numérique en constante évolution. L'ENI associe
                formation théorique rigoureuse et stages obligatoires en entreprise à chaque niveau.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={.15} x={30}>
            <div className="glass rounded-3xl p-8 glow-border h-full">
              <div className="text-3xl mb-4">🔭</div>
              <h3 className="font-display font-bold text-white text-xl mb-3">Vision</h3>
              <p className="font-body text-slate-400 leading-relaxed text-sm">
                Être reconnus comme un <strong className="text-green-400">centre d'excellence en informatique</strong>,
                formant des leaders influents dans l'industrie technologique mondiale.
                Rayonner à l'échelle africaine et internationale par la qualité de ses diplômés.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Timeline + Infos */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <FadeIn delay={.1}>
            <div className="glass rounded-3xl p-8 relative">
              <h3 className="font-display font-bold text-white text-lg mb-6">Chronologie</h3>
              <div className="space-y-4">
                {timeline.map((t, i) => (
                  <motion.div key={t.year}
                    initial={{ opacity:0, x:-20 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:i*.08 }}
                    className="flex items-center gap-4"
                  >
                    <span className="font-mono font-bold text-[11px] text-green-400 w-10 flex-shrink-0">{t.year}</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <div className="flex-1 h-px bg-white/8" />
                    <span className="font-body text-xs text-slate-300 text-right max-w-[180px]">{t.event}</span>
                  </motion.div>
                ))}
              </div>
              {/* Floating badge */}
              <motion.div animate={{ y:[-6,6,-6] }} transition={{ duration:4, repeat:Infinity }}
                className="absolute -top-5 -right-5 glass rounded-2xl px-4 py-3 text-center glow-box"
              >
                <div className="font-display font-black text-2xl grad-r">#1</div>
                <div className="font-mono text-[8px] text-slate-400 tracking-widest uppercase">Afrique</div>
              </motion.div>
            </div>
          </FadeIn>

          <FadeIn delay={.2}>
            <div className="space-y-5">
              <h3 className="font-display font-bold text-white text-lg">Informations officielles</h3>
              {[
                { icon:"🏛️", lbl:"Nom officiel",  val:"École Nationale d'Informatique (ENI)" },
                { icon:"🎓", lbl:"Tutelle",        val:"Université de Fianarantsoa" },
                { icon:"📍", lbl:"Adresse",        val:"Tanambao-Antaninarenina, BP 1487 – 301 Fianarantsoa" },
                { icon:"✉️", lbl:"Email",          val:"eni@eni.mg" },
                { icon:"📞", lbl:"Téléphone",      val:"+261 34 05 733 36 / +261 32 15 204 28" },
                { icon:"🌐", lbl:"Site web",       val:"www.eni.mg" },
                { icon:"⚖️", lbl:"Statut",         val:"Établissement public — Système LMD" },
              ].map(item => (
                <div key={item.lbl} className="glass rounded-xl px-5 py-4 flex items-start gap-4">
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1">{item.lbl}</div>
                    <div className="font-body text-sm text-slate-200">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Valeurs */}
        <FadeIn delay={.1}>
          <h3 className="font-display font-bold text-white text-lg mb-6 text-center">Nos Valeurs</h3>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {valeurs.map((v, i) => (
            <FadeIn key={v.titre} delay={i * .08}>
              <motion.div whileHover={{ y:-6 }} data-hover
                className="glass rounded-2xl p-6 cursor-pointer group card-3d">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{v.icon}</div>
                <h4 className="font-display font-bold text-white text-base mb-2">{v.titre}</h4>
                <p className="font-body text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
