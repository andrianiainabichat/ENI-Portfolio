import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle, HiGlobe } from "react-icons/hi";

/*
  ✅ GOOGLE MAPS — CORRECTION DÉFINITIVE
  
  PROBLÈME IDENTIFIÉ :
  - maps.google.com/maps?q=LAT,LNG place le pin sur les coordonnées brutes
    MAIS l'embed centre parfois la carte ailleurs (surtout en zone dense)
  - Résultat : le pin tombait près de la RN7 à gauche, pas sur l'ENI
  
  SOLUTION :
  - Recherche par NOM EXACT de l'établissement tel qu'il apparaît sur Google Maps :
    "Ecole Nationale d Informatique" + "Fianarantsoa"
  - Google Maps retrouve la vraie FICHE de l'établissement (G3VV+W9F)
    et place le pin rouge exactement sur le bâtiment ENI (Rte Circulaire)
  
  URL EMBED : 
    maps.google.com/maps?q=Ecole+Nationale+d+Informatique,Fianarantsoa&output=embed&z=16
  
  LIEN DIRECT :
    maps.google.com/maps?q=Ecole+Nationale+d+Informatique,Fianarantsoa
    → ouvre la vraie fiche Google Maps de l'ENI (4,8★ · G3VV+W9F)
  
  Coordonnées exactes depuis URL Google Maps (image screenshot) :
    lat = -21.454783
    lng =  47.0915546
*/

// Nom exact tel qu'il apparaît sur Google Maps
const ENI_MAPS_NAME = "Ecole Nationale d Informatique, Fianarantsoa, Madagascar";
const ENI_MAPS_QUERY = "Ecole+Nationale+d+Informatique,+Fianarantsoa,+Madagascar";

// Lien direct vers la vraie fiche Google Maps
const ENI_MAPS_URL = `https://www.google.com/maps/place/${ENI_MAPS_QUERY}/@-21.454783,47.0915546,17z`;

// Embed : recherche par nom → pin sur le bon bâtiment
const ENI_EMBED_URL = `https://maps.google.com/maps?q=${ENI_MAPS_QUERY}&output=embed&z=16&hl=fr`;

const infos = [
  {
    icon: <HiLocationMarker className="w-5 h-5" />,
    label: "Adresse",
    val: "G3VV+W9F, Tanambao-Antaninarenina, BP 1487 – 301 Fianarantsoa",
    color: "text-green-400",
  },
  {
    icon: <HiPhone className="w-5 h-5" />,
    label: "Téléphone",
    val: "+261 34 05 733 36  |  +261 32 15 204 28",
    color: "text-green-300",
  },
  {
    icon: <HiMail className="w-5 h-5" />,
    label: "Email",
    val: "eni@eni.mg",
    color: "text-green-400",
  },
  {
    icon: <HiGlobe className="w-5 h-5" />,
    label: "Site web",
    val: "www.eni.mg",
    color: "text-green-300",
  },
];

export default function Contact() {
  const [form,    setForm]    = useState({ nom:"", email:"", sujet:"", message:"" });
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [focus,   setFocus]   = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
  };

  const cls = (name) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 font-body text-white placeholder-slate-600 outline-none transition-all duration-300 text-sm ${
      focus === name
        ? "border-green-500 shadow-[0_0_14px_rgba(34,197,94,.22)]"
        : "border-white/10 hover:border-white/20"
    }`;

  return (
    <section id="contact" className="relative py-28 overflow-hidden" style={{ background:"#020c06" }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/25 to-transparent" />
      <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-green-600/5 blur-[110px]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-[10px] tracking-[.28em] text-green-400 uppercase block mb-4">
            07 / Nous contacter
          </span>
          <h2 className="font-display font-black text-white mb-5" style={{ fontSize:"clamp(30px,5vw,52px)" }}>
            Prenez <span className="grad-g">Contact</span>
          </h2>
          <p className="font-body text-base text-slate-400 max-w-xl mx-auto">
            Une question sur nos formations, le concours d'entrée ou un partenariat ?
            L'équipe ENI est disponible pour vous répondre.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Colonne gauche : infos + map ── */}
          <motion.div
            initial={{ opacity:0, x:-36 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            className="space-y-4"
          >
            {/* Infos contact */}
            {infos.map((info, i) => (
              <motion.div key={info.label}
                initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ delay:i * .09 }}
                className="glass rounded-2xl p-5 flex items-start gap-4"
              >
                <div className={`${info.color} mt-0.5 flex-shrink-0`}>{info.icon}</div>
                <div>
                  <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1">{info.label}</div>
                  <div className="font-body text-white text-sm">{info.val}</div>
                </div>
              </motion.div>
            ))}

            {/* Horaires */}
            <div className="glass rounded-2xl p-5">
              <div className="font-mono text-[9px] text-green-400 uppercase tracking-widest mb-3">
                Horaires d'ouverture
              </div>
              <div className="space-y-1.5 font-body text-sm text-slate-400">
                <div className="flex justify-between">
                  <span>Lundi – Vendredi</span>
                  <span className="text-white font-medium">08h00 – 17h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="text-white font-medium">08h00 – 12h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="text-slate-600">Fermé</span>
                </div>
              </div>
            </div>

            {/*
              ✅ EMBED GOOGLE MAPS — recherche par NOM d'établissement
              Ceci force Google à retrouver la vraie fiche "Ecole Nationale d Informatique"
              et place le pin rouge exactement sur le bon bâtiment (Rte Circulaire, côté EST)
              et NON pas sur des coordonnées approximatives côté RN7
            */}
            <div
              className="glass rounded-2xl overflow-hidden relative"
              style={{ height:260 }}
            >
              <iframe
                title="Ecole Nationale d Informatique — Fianarantsoa"
                width="100%"
                height="100%"
                style={{ border:0, position:"absolute", inset:0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={ENI_EMBED_URL}
              />
            </div>

            {/* Bouton → vraie fiche Google Maps */}
            <a
              href={ENI_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="flex items-center gap-3 glass rounded-xl p-4 hover:border-green-500/40 transition-all group border border-white/5"
            >
              <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <HiLocationMarker className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-body text-sm text-white">Ouvrir dans Google Maps</div>
                <div className="font-mono text-[9px] text-slate-500 truncate">
                  Ecole Nationale d Informatique · G3VV+W9F · 4,8 ★ (25 avis)
                </div>
              </div>
              <svg
                className="w-4 h-4 text-slate-500 group-hover:text-green-400 transition-colors flex-shrink-0"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </motion.div>

          {/* ── Colonne droite : formulaire ── */}
          <motion.div
            initial={{ opacity:0, x:36 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok"
                  initial={{ opacity:0, scale:.9 }} animate={{ opacity:1, scale:1 }}
                  className="glass rounded-3xl p-12 text-center glow-border"
                >
                  <motion.div
                    initial={{ scale:0 }} animate={{ scale:1 }}
                    transition={{ type:"spring", stiffness:220 }}
                  >
                    <HiCheckCircle className="w-20 h-20 text-green-400 mx-auto mb-5" />
                  </motion.div>
                  <h3 className="font-display font-bold text-white text-xl mb-3">Message envoyé !</h3>
                  <p className="font-body text-slate-400 text-sm leading-relaxed">
                    Notre équipe vous répondra dans les plus brefs délais à l'adresse indiquée.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="glass rounded-3xl p-8 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block mb-1.5">
                        Nom complet
                      </label>
                      <input
                        type="text" placeholder="Votre nom" required
                        className={cls("nom")}
                        value={form.nom}
                        onChange={e => setForm({...form, nom:e.target.value})}
                        onFocus={() => setFocus("nom")} onBlur={() => setFocus("")}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block mb-1.5">
                        Email
                      </label>
                      <input
                        type="email" placeholder="vous@email.com" required
                        className={cls("email")}
                        value={form.email}
                        onChange={e => setForm({...form, email:e.target.value})}
                        onFocus={() => setFocus("email")} onBlur={() => setFocus("")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block mb-1.5">
                      Sujet
                    </label>
                    <select
                      className={cls("sujet") + " cursor-pointer"}
                      value={form.sujet}
                      onChange={e => setForm({...form, sujet:e.target.value})}
                      onFocus={() => setFocus("sujet")} onBlur={() => setFocus("")}
                    >
                      <option value="" disabled className="bg-[#071a0e]">Sélectionnez un sujet</option>
                      <option className="bg-[#071a0e]">Admission & Concours 2025</option>
                      <option className="bg-[#071a0e]">Informations sur les formations</option>
                      <option className="bg-[#071a0e]">Partenariat entreprise</option>
                      <option className="bg-[#071a0e]">Recherche & Doctorat</option>
                      <option className="bg-[#071a0e]">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5} placeholder="Votre message..." required
                      className={cls("message") + " resize-none"}
                      value={form.message}
                      onChange={e => setForm({...form, message:e.target.value})}
                      onFocus={() => setFocus("message")} onBlur={() => setFocus("")}
                    />
                  </div>

                  <motion.button
                    type="submit" disabled={sending}
                    whileHover={{ scale:1.02 }} whileTap={{ scale:.98 }}
                    data-hover
                    className="w-full py-4 rounded-xl font-display font-bold text-white relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-500" />
                    <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center justify-center gap-2">
                      {sending ? (
                        <>
                          <motion.span
                            animate={{ rotate:360 }}
                            transition={{ duration:1, repeat:Infinity, ease:"linear" }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                          />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                          </svg>
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}