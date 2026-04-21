'use client'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from './ThemeProvider'
import { useLanguage } from './LanguageProvider'
import { Scissors, Sparkles, Leaf, Wind, Hand, Crown } from 'lucide-react'

const serviceIcons = [
  <Scissors size={28} color="#1A6DFF" strokeWidth={1.5} />,  // Coiffure
  <Sparkles size={28} color="#1A6DFF" strokeWidth={1.5} />,  // Soin capillaire
  <Leaf size={28} color="#1A6DFF" strokeWidth={1.5} />,      // Soin visage
  <Wind size={28} color="#1A6DFF" strokeWidth={1.5} />,      // Massage
  <Hand size={28} color="#1A6DFF" strokeWidth={1.5} />,      // Épilation
  <Crown size={28} color="#1A6DFF" strokeWidth={1.5} />,     // Forfait premium
]

// const serviceImages = [
//   'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&w=400',
//   'https://images.pexels.com/photos/3998421/pexels-photo-3998421.jpeg?auto=compress&w=400',
//   'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&w=400',
//   'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&w=400',
//   'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&w=400',
//   'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&w=400',
// ]

const serviceImages = [
  '/coiffure 1.jpg',
  '/soin-capillaire 2.jpg',
  '/soin de visage.webp',
  '/massage.jpg',
  '/epilation.png',
  '/forfait-premium.jpg',
]

//const serviceIcons = ['✂️', '💆', '🌿', '🕊️', '💅', '✨']

function Modal({ service, onClose }) {
  const { colors } = useTheme()
  const { t } = useLanguage()

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
              {/* <span style={{ fontSize: '1.5rem' }}>{service.icon}</span> */}
              <div style={{
                position: 'absolute', bottom: '1rem', left: '1rem',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                padding: '8px',
                display: 'flex',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(26,109,255,0.4)'
              }}>
                {service.icon}
              </div>
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
            {t.services.nos_prestations || "Nos prestations"}
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
                {/* Prix supprimé */}
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
            {t.services.reserver_service}
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
  const { t } = useLanguage()
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
            {t.services.en_savoir_plus || "En savoir plus"}
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
  const { t } = useLanguage()
  const titleRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.3 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  // Combine les données de traduction avec les images et icônes
  const servicesData = t.services.liste.map((s, i) => ({
    ...s,
    image: serviceImages[i],
    icon: serviceIcons[i],
  }))

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
          .services-grid { grid-template-columns: 1fr; }
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
            {t.services.tag}
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '700', color: colors.text }}>
            {t.services.titre}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(26,109,255,0.5)' }} />
            <span style={{ color: '#1A6DFF' }}>✦</span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(26,109,255,0.5)' }} />
          </div>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </section>
    </>
  )
}