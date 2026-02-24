'use client'
import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { dark, toggle, colors } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ferme le menu quand on clique sur un lien
  const closeMenu = () => setMenuOpen(false)

  const liens = ['Services', 'Galerie', 'À propos', 'Contact']

  return (
    <>
      <style>{`
        .nav-links-desktop {
          display: flex;
          gap: 2rem;
          list-style: none;
          font-size: 1.1rem;
          letter-spacing: 0.08em;
        }
        .nav-actions-desktop {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .burger-btn {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1100;
        }
        .burger-line {
          width: 26px;
          height: 2px;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .mobile-menu {
          display: none;
        }
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .nav-actions-desktop {
            display: none !important;
          }
          .burger-btn {
            display: flex !important;
          }
          .mobile-menu {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 999;
            padding: 7rem 2rem 3rem;
            gap: 1rem;
            transition: all 0.4s ease;
          }
        }
      `}</style>

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

        {/* LOGO */}
        <img
          src="/logo.png"
          alt="ABI'S BEAUTY CORNER"
          style={{
            height: '90px', width: 'auto', display: 'block',
            filter: dark ? 'brightness(0) invert(1)' : 'none',
            marginBottom: '1rem',
            transition: 'filter 0.4s ease',
          }}
        />

        {/* LIENS DESKTOP */}
        <ul className="nav-links-desktop">
          {liens.map((item) => (
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

        {/* ACTIONS DESKTOP */}
        <div className="nav-actions-desktop">
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

        {/* BURGER BUTTON */}
        <button
          className="burger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="burger-line" style={{
            background: colors.text,
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <span className="burger-line" style={{
            background: colors.text,
            opacity: menuOpen ? 0 : 1,
            transform: menuOpen ? 'translateX(-10px)' : 'none',
          }} />
          <span className="burger-line" style={{
            background: colors.text,
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </button>
      </nav>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          background: dark ? 'rgba(7,7,77,0.98)' : 'rgba(245,245,240,0.98)',
          backdropFilter: 'blur(20px)',
        }}>
          {/* LIENS */}
          {liens.map((item, i) => (
            <a
              key={item}
              href={`#${item === 'À propos' ? 'apropos' : item.toLowerCase()}`}
              onClick={closeMenu}
              style={{
                color: colors.text,
                textDecoration: 'none',
                fontSize: '2rem',
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: '600',
                padding: '0.5rem 0',
                borderBottom: `1px solid ${colors.border}`,
                opacity: 0,
                animation: `fadeUp 0.4s ease ${i * 0.1}s forwards`,
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#1A6DFF'}
              onMouseLeave={e => e.currentTarget.style.color = colors.text}
            >
              {item}
            </a>
          ))}

          {/* ACTIONS MOBILE */}
          <div style={{
            display: 'flex', gap: '1rem', marginTop: '1rem',
            opacity: 0,
            animation: 'fadeUp 0.4s ease 0.4s forwards',
          }}>
            <button onClick={() => { toggle(); closeMenu() }} style={{
              background: 'transparent',
              border: '1px solid rgba(26,109,255,0.4)',
              borderRadius: '50px',
              padding: '0.6rem 1.2rem',
              cursor: 'pointer',
              color: colors.text,
              fontSize: '1rem',
            }}>
              {dark ? '☀️' : '🌙'}
            </button>

            <a href="#reservation" onClick={closeMenu} style={{
              background: 'linear-gradient(135deg, #1A6DFF, #3A2FD9)',
              color: '#fff', padding: '0.7rem 2rem',
              borderRadius: '2px', textDecoration: 'none',
              fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              boxShadow: '0 0 20px rgba(26,109,255,0.4)',
              flex: 1, textAlign: 'center',
            }}>
              Réserver
            </a>
          </div>
        </div>
      )}
    </>
  )
}