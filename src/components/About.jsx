'use client'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from './ThemeProvider'
import { useLanguage } from './LanguageProvider'

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
    const step = (nombre / 2000) * 16
    const timer = setInterval(() => {
      start += step
      if (start >= nombre) { setCount(nombre); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [started, nombre])

  return <span ref={ref}>{count}{suffix}</span>
}

const statsData = [
  { nombre: 12, suffix: '+' },
  { nombre: 500, suffix: '+' },
  { nombre: 8, suffix: '' },
  { nombre: 100, suffix: '%' },
]

export default function About() {
  const [visible, setVisible] = useState(false)
  const { colors } = useTheme()
  const { t } = useLanguage()
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
        .about-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem; align-items: center; }
        .about-img { height: 500px; }
        .about-badge { bottom: -20px; right: -20px; }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
          .about-img { height: 300px !important; }
          .about-badge { bottom: 10px !important; right: 10px !important; }
        }
      `}</style>

      <section id="apropos" ref={ref} style={{ padding: '6rem 2rem', background: colors.bg2, position: 'relative', overflow: 'hidden', transition: 'background 0.4s ease' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, #1A6DFF, transparent)' }} />

        <div className="about-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-50px)', transition: 'all 1s ease', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '-15px', right: '15px', bottom: '15px', border: '1px solid rgba(26,109,255,0.3)', borderRadius: '4px' }} />
            {/* IMAGE AFRICAINE ABOUT */}
            <img
              src="https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&w=600"
              alt="Salon ABI'S"
              className="about-img"
              style={{ width: '100%', objectFit: 'cover', borderRadius: '4px', display: 'block' }}
            />
            <div className="about-badge" style={{ position: 'absolute', background: 'linear-gradient(135deg, #1A6DFF, #3A2FD9)', padding: '1.2rem', borderRadius: '4px', textAlign: 'center', boxShadow: '0 0 30px rgba(26,109,255,0.4)' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: '700', lineHeight: '1', color: '#fff' }}>12+</p>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.8, color: '#fff' }}>{t.about.badge}</p>
            </div>
          </div>

          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(50px)', transition: 'all 1s ease 0.3s' }}>
            <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.8rem', color: '#1A6DFF', marginBottom: '0.5rem' }}>{t.about.tag}</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.1', color: colors.text }}>
              {t.about.titre}
            </h2>
            <p style={{ color: colors.textSub, lineHeight: '1.9', marginBottom: '1rem', fontSize: '0.95rem' }}>{t.about.p1}</p>
            <p style={{ color: colors.textSub, lineHeight: '1.9', marginBottom: '2.5rem', fontSize: '0.95rem' }}>{t.about.p2}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {statsData.map((stat, i) => (
                <div key={i} style={{ borderLeft: '2px solid #1A6DFF', paddingLeft: '1rem' }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: '700', color: '#1A6DFF', lineHeight: '1' }}>
                    <Counter nombre={stat.nombre} suffix={stat.suffix} />
                  </p>
                  <p style={{ fontSize: '0.8rem', color: colors.textSub, marginTop: '0.3rem' }}>{t.about.stats[i].label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}