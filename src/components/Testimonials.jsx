'use client'
import { useTheme } from './ThemeProvider'
import { useEffect, useRef, useState } from 'react'

const avis = [
  { nom: 'Sophie M.', note: 5, texte: 'Une expérience absolument sublime ! L\'équipe est professionnelle et attentionnée. Mon brushing était parfait.', service: 'Coiffure' },
  { nom: 'Amina K.', note: 5, texte: 'Le massage aux pierres chaudes était incroyable. Je me suis sentie totalement régénérée. Je recommande vivement !', service: 'Massage' },
  { nom: 'Fatou D.', note: 5, texte: 'Le soin du visage a transformé ma peau. Résultats visibles dès la première séance. Un vrai moment de luxe.', service: 'Soin visage' },
]

export default function Testimonials() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)
  const { colors } = useTheme()
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % avis.length), 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} style={{
      padding: '7rem 2rem',
      background: colors.bg2,
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.4s ease',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, #1A6DFF, transparent)',
      }} />

      <div style={{
        textAlign: 'center', marginBottom: '4rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease',
      }}>
        <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.8rem', color: '#1A6DFF', marginBottom: '0.5rem' }}>
          Ils nous font confiance
        </p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '700', color: colors.text }}>
          Ce Que Disent Nos Clients
        </h2>
      </div>

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
      }}>
        {avis.map((item, i) => (
          <div key={i} onClick={() => setActive(i)} style={{
            background: active === i ? 'rgba(26,109,255,0.1)' : colors.cardBg,
            border: `1px solid ${active === i ? '#1A6DFF' : colors.border}`,
            borderRadius: '4px',
            padding: '2rem',
            cursor: 'pointer',
            opacity: visible ? 1 : 0,
            transform: visible
              ? active === i ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
              : 'translateY(40px)',
            transition: `all 0.5s ease ${i * 0.15}s`,
            boxShadow: active === i ? '0 20px 50px rgba(26,109,255,0.2)' : 'none',
          }}>
            <div style={{
              fontSize: '3.5rem', color: 'rgba(26,109,255,0.3)',
              fontFamily: 'Georgia, serif', lineHeight: '1', marginBottom: '1rem',
            }}>"</div>
            <p style={{ color: colors.textSub, lineHeight: '1.8', fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              {item.texte}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: '500', fontSize: '0.9rem', color: colors.text }}>{item.nom}</p>
                <p style={{ color: '#1A6DFF', fontSize: '0.75rem', letterSpacing: '0.1em' }}>{item.service}</p>
              </div>
              <div style={{ color: '#1A6DFF', letterSpacing: '2px' }}>★★★★★</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
        {avis.map((_, i) => (
          <div key={i} onClick={() => setActive(i)} style={{
            width: active === i ? '30px' : '8px',
            height: '8px', borderRadius: '4px',
            background: active === i ? '#1A6DFF' : colors.border,
            cursor: 'pointer', transition: 'all 0.4s ease',
          }} />
        ))}
      </div>
    </section>
  )
}