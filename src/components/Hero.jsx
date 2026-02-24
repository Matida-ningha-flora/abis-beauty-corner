'use client'
import { useTheme } from './ThemeProvider'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <>
      <style>{`
        .hero-circles-large { display: block; }
        .hero-content { padding: 0 2rem; }
        @media (max-width: 768px) {
          .hero-circles-large { display: none; }
          .hero-content { padding: 0 1.2rem; }
          .hero-buttons { flex-direction: column; align-items: center; }
          .hero-buttons a { width: 100%; text-align: center; }
        }
      `}</style>

      <section style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img
          src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="salon"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.25)',
            transform: visible ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 10s ease',
          }}
        />

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(10,10,10,0.8) 0%, rgba(13,27,42,0.7) 100%)',
        }} />

        {/* CERCLES — cachés sur mobile */}
        <div className="hero-circles-large">
          <div style={{
            position: 'absolute', top: '8%', right: '6%',
            width: '300px', height: '300px',
            border: '1px solid rgba(26,109,255,0.2)',
            borderRadius: '50%',
            animation: 'rotateSlow 20s linear infinite',
          }} />
          <div style={{
            position: 'absolute', top: 'calc(8% + 30px)', right: 'calc(6% + 30px)',
            width: '240px', height: '240px',
            border: '1px solid rgba(58,47,217,0.15)',
            borderRadius: '50%',
            animation: 'rotateSlow 15s linear infinite reverse',
          }} />
          <div style={{
            position: 'absolute', bottom: '10%', left: '4%',
            width: '200px', height: '200px',
            border: '1px solid rgba(26,109,255,0.15)',
            borderRadius: '50%',
            animation: 'rotateSlow 25s linear infinite',
          }} />
        </div>

        {/* PARTICULES */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '4px', height: '4px',
            borderRadius: '50%',
            background: '#1A6DFF',
            opacity: 0.5,
            top: `${20 + i * 12}%`,
            left: `${8 + i * 15}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }} />
        ))}

        {/* CONTENU */}
        <div className="hero-content" style={{ textAlign: 'center', zIndex: 10 }}>
          <p style={{
            fontFamily: 'Great Vibes, cursive',
            fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
            color: '#1A6DFF', marginBottom: '0.5rem',
            opacity: 0,
            animation: visible ? 'fadeUp 0.8s ease 0.2s forwards' : 'none',
          }}>
            Bienvenue chez
          </p>

          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontWeight: '700', lineHeight: '0.9', marginBottom: '0.3rem',
            background: 'linear-gradient(135deg, #ffffff 30%, #a0c4ff 70%, #ffffff 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            opacity: 0,
            animation: visible ? 'fadeUp 0.8s ease 0.4s forwards, shimmer 4s linear 1.5s infinite' : 'none',
          }}>
            ABI'S
          </h1>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1rem, 3vw, 2.5rem)',
            fontWeight: '300', letterSpacing: '0.4em',
            color: 'rgba(255,255,255,0.85)', marginBottom: '2rem',
            opacity: 0,
            animation: visible ? 'fadeUp 0.8s ease 0.6s forwards' : 'none',
          }}>
            BEAUTY CORNER
          </h2>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '1rem', marginBottom: '1.5rem',
            opacity: 0,
            animation: visible ? 'fadeIn 0.8s ease 0.8s forwards' : 'none',
          }}>
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #1A6DFF)' }} />
            <span style={{ color: '#1A6DFF', display: 'inline-block', animation: 'float 2s ease-in-out infinite' }}>✦</span>
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to left, transparent, #1A6DFF)' }} />
          </div>

          <p style={{
            fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)', letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase',
            marginBottom: '3rem',
            opacity: 0,
            animation: visible ? 'fadeUp 0.8s ease 1s forwards' : 'none',
          }}>
            Coiffure · Beauté · Massage · Bien-être
          </p>

          <div className="hero-buttons" style={{
            display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            opacity: 0,
            animation: visible ? 'fadeUp 0.8s ease 1.2s forwards' : 'none',
          }}>
            <a href="#reservation" style={{
              background: 'linear-gradient(135deg, #1A6DFF, #3A2FD9)',
              color: '#fff', padding: '1rem 2.5rem', textDecoration: 'none',
              fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              borderRadius: '2px', animation: 'glow 2s ease-in-out infinite',
              transition: 'transform 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Prendre Rendez-vous
            </a>
            <a href="#services" style={{
              background: 'transparent', color: '#fff',
              padding: '1rem 2.5rem', textDecoration: 'none',
              fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.4)', borderRadius: '2px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#1A6DFF'; e.currentTarget.style.color = '#1A6DFF'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Découvrir
            </a>
          </div>
        </div>

        {/* SCROLL */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          opacity: 0,
          animation: visible ? 'fadeIn 1s ease 1.5s forwards' : 'none',
        }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: '#fff', opacity: 0.6 }}>SCROLL</span>
          <div style={{
            width: '1px', height: '60px',
            background: 'linear-gradient(to bottom, #1A6DFF, transparent)',
            animation: 'scrollLine 2s ease-in-out infinite',
          }} />
        </div>
      </section>
    </>
  )
}