'use client'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from './ThemeProvider'

const services = [
  {
    icon: '✂️', titre: 'Coiffure',
    description: 'Coupes tendance, colorations, balayages et coiffages pour sublimer votre chevelure.',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&w=800',
    details: [
      { nom: 'Coupe Femme', prix: '15 000 FCFA', duree: '45 min' },
      { nom: 'Coupe Homme', prix: '8 000 FCFA', duree: '30 min' },
      { nom: 'Coloration complète', prix: '35 000 FCFA', duree: '2h' },
      { nom: 'Balayage / Mèches', prix: '40 000 FCFA', duree: '2h30' },
      { nom: 'Brushing', prix: '10 000 FCFA', duree: '30 min' },
    ],
    longDescription: 'Notre équipe de coiffeurs experts maîtrise les dernières tendances pour vous offrir une coupe parfaitement adaptée à votre morphologie et votre style de vie.',
  },
  {
    icon: '💆', titre: 'Soins Capillaires',
    description: 'Kératine, masques nutritifs et traitements restructurants pour des cheveux en pleine santé.',
    image: 'https://images.pexels.com/photos/3738355/pexels-photo-3738355.jpeg?auto=compress&w=800',
    details: [
      { nom: 'Lissage brésilien', prix: '60 000 FCFA', duree: '3h' },
      { nom: 'Masque nutritif', prix: '15 000 FCFA', duree: '45 min' },
      { nom: 'Traitement kératine', prix: '50 000 FCFA', duree: '2h30' },
      { nom: 'Soin hydratant', prix: '12 000 FCFA', duree: '30 min' },
    ],
    longDescription: 'Nos soins capillaires utilisent des produits professionnels de haute qualité pour restaurer, nourrir et embellir votre chevelure en profondeur.',
  },
  {
    icon: '🌿', titre: 'Soins du Visage',
    description: 'Nettoyage en profondeur, hydratation intense et soins anti-âge pour une peau rayonnante.',
    image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&w=800',
    details: [
      { nom: 'Nettoyage peau', prix: '20 000 FCFA', duree: '1h' },
      { nom: 'Soin hydratant', prix: '25 000 FCFA', duree: '1h' },
      { nom: 'Soin anti-âge', prix: '35 000 FCFA', duree: '1h30' },
      { nom: 'Peeling doux', prix: '30 000 FCFA', duree: '1h' },
    ],
    longDescription: 'Nos esthéticiennes qualifiées analysent votre type de peau pour vous proposer le soin le plus adapté, avec des produits naturels et efficaces.',
  },
  {
    icon: '🕊️', titre: 'Massages',
    description: 'Massages relaxants, modelages corps et soins aux pierres chaudes pour un bien-être total.',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&w=800',
    details: [
      { nom: 'Massage relaxant', prix: '25 000 FCFA', duree: '1h' },
      { nom: 'Modelage corps', prix: '35 000 FCFA', duree: '1h30' },
      { nom: 'Pierres chaudes', prix: '40 000 FCFA', duree: '1h30' },
      { nom: 'Massage dos', prix: '15 000 FCFA', duree: '30 min' },
    ],
    longDescription: 'Laissez-vous transporter dans un état de relaxation profonde grâce à nos massages thérapeutiques pratiqués par des thérapeutes certifiés.',
  },
  {
    icon: '💅', titre: 'Beauté & Épilation',
    description: 'Mise en beauté des sourcils, onglerie et épilation pour une silhouette parfaite.',
    image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&w=800',
    details: [
      { nom: 'Manucure complète', prix: '12 000 FCFA', duree: '45 min' },
      { nom: 'Pose gel/résine', prix: '25 000 FCFA', duree: '1h30' },
      { nom: 'Épilation sourcils', prix: '5 000 FCFA', duree: '15 min' },
      { nom: 'Épilation jambes', prix: '20 000 FCFA', duree: '45 min' },
    ],
    longDescription: 'Du nail art aux épilations les plus précises, notre équipe beauté prend soin de chaque détail pour que vous soyez parfaite de la tête aux pieds.',
  },
  {
    icon: '✨', titre: 'Forfaits Premium',
    description: 'Des packages exclusifs combinant plusieurs soins pour une expérience complète et luxueuse.',
    image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&w=800',
    details: [
      { nom: 'Forfait Beauté', prix: '55 000 FCFA', duree: '3h' },
      { nom: 'Forfait Détente', prix: '65 000 FCFA', duree: '3h30' },
      { nom: 'Forfait Mariée', prix: '120 000 FCFA', duree: '6h' },
      { nom: 'Forfait VIP', prix: '150 000 FCFA', duree: 'Journée' },
    ],
    longDescription: 'Nos forfaits premium sont conçus pour vous offrir une journée de transformation totale. Idéal pour les occasions spéciales ou simplement pour se faire plaisir.',
  },
]

function Modal({ service, onClose }) {
  const { colors } = useTheme()
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', backdropFilter: 'blur(8px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: colors.bg2,
        border: '1px solid rgba(26,109,255,0.3)',
        borderRadius: '8px',
        maxWidth: '700px', width: '100%',
        maxHeight: '90vh', overflowY: 'auto',
        position: 'relative',
      }}>
        <div style={{ position: 'relative', height: '180px' }}>
          <img src={service.image} alt={service.titre} style={{
            width: '100%', height: '100%', objectFit: 'cover',
            borderRadius: '8px 8px 0 0', filter: 'brightness(0.5)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'flex-end', padding: '1rem',
            background: 'linear-gradient(to top, rgba(13,27,42,1) 0%, transparent 60%)',
          }}>
            <div>
              <span style={{ fontSize: '1.5rem' }}>{service.icon}</span>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: '700', color: '#fff' }}>
                {service.titre}
              </h2>
            </div>
          </div>
          <button onClick={onClose} style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', width: '35px', height: '35px',
            borderRadius: '50%', cursor: 'pointer', fontSize: '1rem',
          }}>✕</button>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <p style={{ color: colors.textSub, lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {service.longDescription}
          </p>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: '1rem', color: '#1A6DFF' }}>
            Nos tarifs
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.5rem' }}>
            {service.details.map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.8rem', background: colors.bg3,
                borderRadius: '4px', border: `1px solid ${colors.border}`,
              }}>
                <div>
                  <p style={{ fontWeight: '500', fontSize: '0.85rem', color: colors.text }}>{item.nom}</p>
                  <p style={{ color: colors.textSub, fontSize: '0.72rem', marginTop: '0.2rem' }}>⏱ {item.duree}</p>
                </div>
                <span style={{ color: '#1A6DFF', fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: '600' }}>
                  {item.prix}
                </span>
              </div>
            ))}
          </div>
          <a href="#reservation" onClick={onClose} style={{
            display: 'block', textAlign: 'center',
            background: 'linear-gradient(135deg, #1A6DFF, #3A2FD9)',
            color: '#fff', padding: '1rem', textDecoration: 'none',
            borderRadius: '4px', fontSize: '0.85rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            Réserver ce service
          </a>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service, index }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { colors, dark } = useTheme()
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {modalOpen && <Modal service={service} onClose={() => setModalOpen(false)} />}
      <div ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
        style={{
          background: hovered ? colors.cardHover : colors.cardBg,
          border: `1px solid ${hovered ? '#1A6DFF' : colors.border}`,
          borderRadius: '6px', overflow: 'hidden', cursor: 'pointer',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: `all 0.6s ease ${index * 0.1}s`,
          boxShadow: hovered ? '0 10px 40px rgba(26,109,255,0.15)' : `0 4px 20px ${dark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
        }}
      >
        <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
          <img src={service.image} alt={service.titre} style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s ease', filter: 'brightness(0.55)',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,27,42,0.9) 0%, transparent 60%)' }} />
          <span style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontSize: '2rem' }}>{service.icon}</span>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.6rem',
            color: hovered ? '#1A6DFF' : colors.text, transition: 'color 0.3s',
          }}>{service.titre}</h3>
          <p style={{ color: colors.textSub, fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>
            {service.description}
          </p>
          <span style={{
            fontSize: '0.78rem', letterSpacing: '0.1em', color: '#1A6DFF',
            textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            Voir les tarifs
            <span style={{ transition: 'transform 0.3s', transform: hovered ? 'translateX(5px)' : 'translateX(0)', display: 'inline-block' }}>→</span>
          </span>
        </div>
      </div>
    </>
  )
}

export default function Services() {
  const [titleVisible, setTitleVisible] = useState(false)
  const { colors } = useTheme()
  const titleRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.3 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section id="services" style={{
        padding: '6rem 1.5rem',
        background: colors.bg,
        position: 'relative',
        transition: 'background 0.4s ease',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, #1A6DFF, transparent)' }} />

        <div ref={titleRef} style={{
          textAlign: 'center', marginBottom: '4rem',
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.8rem', color: '#1A6DFF', marginBottom: '0.5rem' }}>
            Ce que nous offrons
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '700', color: colors.text }}>
            Nos Prestations
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(26,109,255,0.5)' }} />
            <span style={{ color: '#1A6DFF' }}>✦</span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(26,109,255,0.5)' }} />
          </div>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.titre} service={service} index={index} />
          ))}
        </div>
      </section>
    </>
  )
}