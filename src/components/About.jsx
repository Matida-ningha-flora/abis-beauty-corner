'use client'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from './ThemeProvider'

const stats = [
  { nombre: 12, suffix: '+', label: 'Ans d\'expérience' },
  { nombre: 500, suffix: '+', label: 'Clients satisfaits' },
  { nombre: 8, suffix: '', label: 'Experts beauté' },
  { nombre: 100, suffix: '%', label: 'Satisfaction client' },
]

function Counter({ nombre, suffix }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const duration = 2000
    const step = (nombre / duration) * 16
    const timer = setInterval(() => {
      start += step
      if (start >= nombre) { setCount(nombre); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [started, nombre])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  const [visible, setVisible] = useState(false)
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

  return (
    <>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 4rem;
          align-items: center;
        }
        .about-img {
          height: 500px;
        }
        .about-badge {
          bottom: -20px;
          right: -20px;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .about-img {
            height: 280px !important;
          }
          .about-badge {
            bottom: -15px !important;
            right: 10px !important;
            padding: 1rem !important;
          }
          .about-badge p:first-child {
            font-size: 1.8rem !important;
          }
        }
      `}</style>

      <section id="apropos" ref={ref} style={{
        padding: '6rem 2rem',
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

        <div className="about-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* IMAGE */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'all 1s ease', position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: '-15px', left: '-15px',
              right: '15px', bottom: '15px',
              border: '1px solid rgba(26,109,255,0.3)', borderRadius: '4px',
            }} />
            <img
              src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&w=600"
              alt="Salon ABI'S BEAUTY CORNER"
              className="about-img"
              style={{ width: '100%', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
            />
            <div className="about-badge" style={{
              position: 'absolute',
              background: 'linear-gradient(135deg, #1A6DFF, #3A2FD9)',
              padding: '1.5rem', borderRadius: '4px', textAlign: 'center',
              boxShadow: '0 0 30px rgba(26,109,255,0.4)',
            }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: '700', lineHeight: '1', color: '#fff' }}>12+</p>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', opacity: 0.8, color: '#fff' }}>ANS D'EXPÉRIENCE</p>
            </div>
          </div>

          {/* TEXTE */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 1s ease 0.3s',
          }}>
            <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.8rem', color: '#1A6DFF', marginBottom: '0.5rem' }}>
              Notre histoire
            </p>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700',
              marginBottom: '1.5rem', lineHeight: '1.1', color: colors.text,
            }}>
              Un Espace Pensé<br />Pour Vous Sublimer
            </h2>
            <p style={{ color: colors.textSub, lineHeight: '1.9', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Chez ABI'S BEAUTY CORNER, nous croyons que la beauté est un art. Notre équipe de professionnels passionnés vous accueille dans un cadre luxueux et apaisant pour vous offrir une expérience unique.
            </p>
            <p style={{ color: colors.textSub, lineHeight: '1.9', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
              De la coiffure aux soins du visage, en passant par les massages relaxants, chaque prestation est réalisée avec soin et expertise pour révéler votre beauté naturelle.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {stats.map((stat) => (
                <div key={stat.label} style={{ borderLeft: '2px solid #1A6DFF', paddingLeft: '1rem' }}>
                  <p style={{
                    fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem',
                    fontWeight: '700', color: '#1A6DFF', lineHeight: '1',
                  }}>
                    <Counter nombre={stat.nombre} suffix={stat.suffix} />
                  </p>
                  <p style={{ fontSize: '0.8rem', color: colors.textSub, marginTop: '0.3rem' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}