'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PiEngine, PiLightbulb, PiShootingStar, PiBookOpenLight } from 'react-icons/pi'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const expertises = [
  {
    icon: PiEngine,
    title: 'Systèmes HTB / HTA',
    desc: 'Conception, analyse et exploitation des réseaux haute et très haute tension.',
  },
  {
    icon: PiLightbulb,
    title: 'Simulateurs OTS',
    desc: 'Déploiement, paramétrage et ingénierie pédagogique des simulateurs de formation réseau.',
  },
  {
    icon: PiShootingStar,
    title: 'Intégration ENR',
    desc: "Études d'intégration des énergies renouvelables dans les réseaux de transport et de distribution.",
  },
  {
    icon: PiBookOpenLight,
    title: 'Pilotage projet réglementé',
    desc: 'Coordination de projets complexes soumis aux contraintes réglementaires du secteur énergie.',
  },
]

const valeurs = [
  {
    titre: 'Excellence',
    texte:
      "Chaque mission est abordée avec le même niveau d'exigence qu'un projet stratégique. Je m'appuie sur une veille technique permanente et une rigueur méthodologique issue du terrain pour produire des livrables qui tiennent à l'épreuve de l'opérationnel — pas seulement du bureau.",
  },
  {
    titre: 'Intégrité',
    texte:
      "Je ne prends que les missions pour lesquelles je peux apporter une valeur réelle. Quand une limite est atteinte, je le dis clairement. Cette transparence construit la confiance sur le long terme et évite les désillusions à mi-parcours, quand les enjeux sont les plus élevés.",
  },
  {
    titre: 'Partenariat',
    texte:
      "Je travaille aux côtés de vos équipes, pas au-dessus d'elles. Ma posture est celle d'un pair expert, capable de monter en compétence avec vous et de transférer les savoir-faire. Une mission réussie, c'est une équipe cliente plus forte à la fin qu'au début.",
  },
]

export default function AProposContent() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="bg-betapower-darkblue py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <h1 className="text-white mb-4">À propos de BetaPower</h1>
            <p className="text-betapower-azure text-lg" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
              Un cabinet fondé par un ingénieur de terrain
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FONDATEUR ────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex flex-col lg:flex-row gap-14 items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Portrait */}
            <motion.div
              className="flex flex-col items-center shrink-0"
              variants={fadeUp}
              transition={{ duration: 0.85, ease: 'easeOut' }}
            >
              <div
                className="rounded-full overflow-hidden"
                style={{ width: 240, height: 240, border: '3px solid #407489', flexShrink: 0 }}
              >
                <Image
                  src="/images/photo.png"
                  alt="Vincent Taillandier"
                  width={240}
                  height={240}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">
                Vincent Taillandier — Fondateur
              </p>
            </motion.div>

            {/* Texte narratif */}
            <motion.div
              className="space-y-6 text-gray-600 leading-relaxed"
              style={{ fontSize: '1rem', lineHeight: 1.8, fontFamily: 'var(--font-inter, sans-serif)' }}
              variants={fadeUp}
              transition={{ duration: 0.85, ease: 'easeOut' }}
            >
              <p>
                BetaPower est née d'un constat simple : les projets d'infrastructure réseau les plus complexes
                manquent rarement de ressources — ils manquent d'expertise pointue, disponible au bon moment.
                J'ai créé ce cabinet pour combler cet écart, en apportant une compétence technique de haut niveau
                directement là où elle crée de la valeur.
              </p>
              <p>
                Avec sept ans d'expérience sur les réseaux HTB/HTA, j'ai contribué à des projets réglementés
                d'envergure nationale et internationale, notamment auprès de RTE. J'ai travaillé sur
                l'intégration d'énergies renouvelables, le déploiement de simulateurs OTS pour la formation
                des opérateurs réseau, et la conduite de projets soumis aux contraintes les plus exigeantes
                du secteur de l'énergie.
              </p>
              <p>
                Ma conviction profonde : un réseau électrique qui fonctionne bien, c'est une infrastructure
                qui a été pensée par des gens qui comprennent à la fois la physique du système, les contraintes
                réglementaires et les réalités du terrain. C'est ce regard croisé que j'apporte à chaque mission.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERTISE ────────────────────────────────────────── */}
      <section className="bg-betapower-bg py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="mb-14"
          >
            <h2 className="text-gray-900 mb-3">Ce que je maîtrise</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {expertises.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                className="card flex gap-5 items-start"
                variants={fadeUp}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              >
                <div className="text-betapower-azure shrink-0 mt-1">
                  <Icon size={28} />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2" style={{ fontSize: '1.05rem', fontWeight: 600 }}>{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VALEURS ──────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="mb-14"
          >
            <h2 className="text-gray-900">Mes valeurs</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {valeurs.map(({ titre, texte }) => (
              <motion.div
                key={titre}
                variants={fadeUp}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              >
                <h3
                  className="mb-4"
                  style={{ color: '#D97706', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-playfair, Georgia, serif)' }}
                >
                  {titre}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
                  {texte}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-betapower-darkblue py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <p className="text-white text-xl mb-8" style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
            Un projet ? Parlons-en directement.
          </p>
          <Link href="/contact" className="btn-primary">
            Prendre contact
          </Link>
          <div className="mt-6">
            <a
              href="https://www.linkedin.com/in/vincent-taillandier"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/45 text-sm hover:text-white/70 transition-colors"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              Retrouvez-moi sur LinkedIn →
            </a>
          </div>
        </motion.div>
      </section>
    </>
  )
}
