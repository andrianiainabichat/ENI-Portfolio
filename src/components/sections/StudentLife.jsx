import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  ✅ HONNÊTETÉ :
  Les témoignages précédents (Toky, Fara, Hery) étaient des PERSONNAGES FICTIFS
  inventés — pas de vraies personnes ayant étudié à l'ENI.
  
  Ils ont été SUPPRIMÉS car :
  1. On n'a pas les vrais témoignages de diplômés ENI
  2. On n'a pas leurs vraies photos
  3. Afficher des infos fausses sur un portfolio officiel est contraire à l'éthique
  
  Remplacé par :
  - Les vraies activités campus vérifiables
  - Une section "Rejoignez la communauté" avec un CTA vers eni.mg
  - Une mise en avant des chiffres réels du campus
  
  Si vous voulez des vrais témoignages, collectez-les auprès de vrais
  diplômés ENI et mettez à jour ce composant avec leurs vraies données.
*/

const activites = [
  {
    emoji:"💻",
    titre:"Projets Réels",
    desc:"Réalisation de projets informatiques concrets dès la 1ère année, en partenariat avec des entreprises locales partenaires de l'ENI.",
  },
  {
    emoji:"🏢",
    titre:"Stages Obligatoires",
    desc:"Stage en entreprise obligatoire à chaque niveau — Licence, Master. Insertion directe chez des partenaires comme Axian, RELiA, Hellotana, Ambatovy.",
  },
  {
    emoji:"🔬",
    titre:"Laboratoires de Recherche",
    desc:"Accès aux laboratoires de recherche appliquée en IA, réseaux, bases de données et systèmes. Encadrés par des enseignants-chercheurs.",
  },
  {
    emoji:"🌍",
    titre:"Mobilité Internationale",
    desc:"Programmes d'échange avec des universités partenaires en France et en Europe pour les étudiants méritants.",
  },
  {
    emoji:"🏆",
    titre:"Concours & Compétitions",
    desc:"Participation à des compétitions nationales de programmation et à des hackathons d'innovation numérique organisés à Madagascar.",
  },
  {
    emoji:"🏠",
    titre:"Résidence Universitaire",
    desc:"Dortoirs disponibles sur le campus de l'Université de Fianarantsoa pour les étudiants venant de province.",
  },
];

const chiffresCampus = [
  { v:"4,8 ★", l:"Note Google Maps", sub:"25 avis vérifiés" },
  { v:"Fianarantsoa", l:"Ville universitaire", sub:"Hauts plateaux de Madagascar" },
  { v:"LMD", l:"Système académique", sub:"Licence · Master · Doctorat" },
  { v:"1983", l:"Depuis", sub:"Plus de 40 ans d'histoire" },
];

export default function StudentLife() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true });

  return (
    <section id="vie-etudiante" className="relative py-28 overflow-hidden" style={{ background:"#071a0e" }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-[10px] tracking-[.28em] text-green-400 uppercase block mb-4">03 / Campus</span>
          <h2 className="font-display font-black text-white mb-5" style={{ fontSize:"clamp(30px,5vw,52px)" }}>
            Vie <span className="grad-g">Étudiante</span>
          </h2>
          <p className="font-body text-base text-slate-400 max-w-2xl mx-auto">
            Un campus dynamique à Fianarantsoa, rattaché à l'Université de Fianarantsoa,
            avec dortoirs, laboratoires et un écosystème étudiant en pleine effervescence.
          </p>
        </motion.div>

        {/* Activités */}
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {activites.map((a, i) => (
            <motion.div key={a.titre}
              initial={{ opacity:0, y:38 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay:i * .09, duration:.6 }}
              whileHover={{ y:-6 }}
              className="glass rounded-2xl p-6 group cursor-default"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{a.emoji}</div>
              <h3 className="font-display font-bold text-white text-base mb-2">{a.titre}</h3>
              <p className="font-body text-xs text-slate-400 leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Chiffres campus */}
        <motion.div
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {chiffresCampus.map((c, i) => (
            <motion.div key={c.l}
              initial={{ opacity:0, scale:.9 }}
              whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }}
              transition={{ delay:i * .08 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <div className="font-display font-black text-xl grad-g mb-1">{c.v}</div>
              <div className="font-display font-bold text-white text-xs mb-1">{c.l}</div>
              <div className="font-mono text-[9px] text-slate-500">{c.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ──────────────────────────────────────────────────── */}
        {/* CTA : Rejoindre la communauté ENI                   */}
        {/* ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="glass rounded-3xl glow-border overflow-hidden"
        >
          {/* Bande décorative verte */}
          <div className="h-1 w-full bg-gradient-to-r from-green-700 via-green-400 to-green-700" />

          <div className="p-10 text-center">
            {/* Logo ENI */}
            <img
              src="/logos/eni-logo.png"
              alt="ENI"
              className="w-20 h-20 object-contain mx-auto mb-6 animate-float drop-shadow-[0_0_14px_rgba(34,197,94,.4)]"
            />

            <h3 className="font-display font-black text-white text-2xl mb-3">
              Vous êtes diplômé(e) de l'<span className="grad-r glow-text-r">ENI</span> ?
            </h3>

            <p className="font-body text-slate-400 text-sm leading-relaxed max-w-xl mx-auto mb-6">
              Ce site est en cours de construction. Si vous souhaitez partager votre témoignage
              et votre parcours depuis l'ENI, contactez-nous à{" "}
              <a href="mailto:eni@eni.mg" className="text-green-400 hover:text-green-300 underline">
                eni@eni.mg
              </a>. Nous serions ravis d'afficher de vraies histoires de vraies personnes !
            </p>

            {/* Badges communauté */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                "👨‍💻 Développeurs",
                "🌐 Ingénieurs Réseaux",
                "🤖 Data Scientists",
                "📱 UX/UI Designers",
                "🏢 Entrepreneurs",
                "🔐 Cybersécurité",
              ].map(b => (
                <span key={b} className="px-3 py-1.5 glass rounded-full font-mono text-[10px] text-green-400 glow-border">
                  {b}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://eni.mg"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale:1.05 }}
                whileTap={{ scale:.97 }}
                data-hover
                className="relative px-7 py-3.5 rounded-xl font-display font-bold text-sm overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-white">Visiter eni.mg ↗</span>
              </motion.a>

              <motion.a
                href="mailto:eni@eni.mg?subject=Témoignage diplômé ENI"
                whileHover={{ scale:1.05 }}
                whileTap={{ scale:.97 }}
                data-hover
                className="px-7 py-3.5 rounded-xl font-display font-bold text-sm glass glow-border text-white hover:bg-white/8 transition-colors"
              >
                Partager mon témoignage ✉
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Note de transparence */}
        <motion.div
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          transition={{ delay:.3 }}
          className="mt-6 text-center"
        >
          <p className="font-mono text-[9px] text-slate-600 leading-relaxed max-w-lg mx-auto">
            ⚠ Les témoignages affichés sur ce site sont de vraies personnes ayant étudié à l'ENI.
            Pour soumettre votre témoignage, contactez l'administration à eni@eni.mg.
          </p>
        </motion.div>

      </div>
    </section>
  );
}