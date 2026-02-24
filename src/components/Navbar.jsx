'use client'
import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { dark, toggle, colors } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      padding: '0.01rem 4rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled
        ? dark ? 'rgba(7,7,77,0.97)' : 'rgba(245,245,240,0.97)'
        : dark ? 'rgba(19,19,83,0.85)' : 'rgba(245,245,240,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(26,109,255,0.2)',
      transition: 'all 0.4s ease',
    }}>

      {/* LOGO AGRANDI SANS CONTOUR */}
      <img
        src="/logo.png"
        alt="ABI'S BEAUTY CORNER"
        style={{
          height: '90px',
          width: 'auto',
          display: 'block',
          filter: dark ? 'brightness(0) invert(1)' : 'none',
          marginBottom: '1rem',
          transition: 'filter 0.4s ease',
        }}
      />

      <ul style={{
        display: 'flex', gap: '2rem', listStyle: 'none',
        fontSize: '1.1rem', letterSpacing: '0.08em',
      }}>
        {['Services', 'Galerie', 'À propos', 'Contact'].map((item) => (
          <li key={item}>
            <a href={`#${item === 'À propos' ? 'apropos' : item.toLowerCase()}`} style={{
              color: colors.textSub, textDecoration: 'none', transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = '#1A6DFF'}
            onMouseLeave={e => e.target.style.color = colors.textSub}
            >{item}</a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* BOUTON TOGGLE THÈME */}
        <button onClick={toggle} style={{
          background: 'transparent',
          border: '1px solid rgba(26,109,255,0.4)',
          borderRadius: '50px',
          padding: '0.4rem 0.9rem',
          cursor: 'pointer',
          color: colors.text,
          fontSize: '1rem',
          transition: 'all 0.3s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#1A6DFF'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(26,109,255,0.4)'}
        >
          {dark ? '☀️' : '🌙'}
        </button>

        <a href="#reservation" style={{
          background: 'linear-gradient(135deg, #1A6DFF, #3A2FD9)',
          color: '#fff', padding: '0.6rem 1.5rem',
          borderRadius: '2px', textDecoration: 'none',
          fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          boxShadow: '0 0 20px rgba(26,109,255,0.4)',
        }}>
          Réserver
        </a>
      </div>
    </nav>
  )
}