'use client'
// app/galerie/[categorie]/GalerieClient.jsx
// Fichier CLIENT — toute la logique interactive
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'

export default function GalerieClient({ gallery, categorie }) {
  const router = useRouter()
  const [selected, setSelected] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50)
    return () => clearTimeout(t)
  }, [])

  const handleKey = useCallback((e) => {
    if (selected === null || !gallery) return
    if (e.key === 'ArrowRight') setSelected(i => Math.min(i + 1, gallery.photos.length - 1))
    if (e.key === 'ArrowLeft') setSelected(i => Math.max(i - 1, 0))
    if (e.key === 'Escape') setSelected(null)
  }, [selected, gallery])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  if (!gallery) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d1b2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', marginBottom: '1rem' }}>
            Catégorie introuvable
          </p>
          <button onClick={() => router.push('/#galerie')} style={btnStyle}>
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  const titreFormate = categorie.replace(/-/g, ' ')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Great+Vibes&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .photo-item {
          height: 240px; border-radius: 4px;
          overflow: hidden; cursor: pointer; position: relative;
        }
        .photo-item img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease, filter 0.4s ease;
          filter: brightness(0.85);
        }
        .photo-item:hover img { transform: scale(1.06); filter: brightness(0.6); }
        .photo-item-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s ease;
          border: 1px solid rgba(26,109,255,0.5); border-radius: 4px;
        }
        .photo-item:hover .photo-item-overlay { opacity: 1; }
        .photo-item-overlay span {
          color: #fff; font-size: 0.75rem;
          letter-spacing: 0.15em; text-transform: uppercase;
        }
        @media (max-width: 640px) {
          .photo-grid { grid-template-columns: 1fr 1fr; gap: 0.6rem; }
          .photo-item { height: 160px; }
        }
        @media (max-width: 380px) {
          .photo-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d1b2a', fontFamily: 'Cormorant Garamond, serif' }}>

        {/* ── Header avec image cover ── */}
        <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
          <img
            src={gallery.cover}
            alt={titreFormate}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.95) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            flexDirection: 'column', justifyContent: 'flex-end', padding: '2.5rem 2rem',
          }}>
            <button
              onClick={() => router.push('/#galerie')}
              style={{
                ...btnStyle, alignSelf: 'flex-start', marginBottom: '1.5rem',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.5s ease',
              }}
            >
              ← Retour
            </button>
            <div style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s ease 0.1s',
            }}>
              <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.4rem', color: '#1A6DFF', marginBottom: '0.3rem' }}>
                Notre galerie
              </p>
              <h1 style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '700',
                color: '#fff', textTransform: 'capitalize', lineHeight: 1.1,
              }}>
                {titreFormate}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.6rem', letterSpacing: '0.08em' }}>
                {gallery.photos.length} photo{gallery.photos.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(to right, transparent, #1A6DFF, transparent)',
          }} />
        </div>

        {/* ── Grille de photos ── */}
        <div style={{ padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
          {gallery.photos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.4)' }}>
              <p style={{ fontSize: '1.2rem' }}>Photos bientôt disponibles</p>
            </div>
          ) : (
            <div className="photo-grid">
              {gallery.photos.map((url, i) => (
                <div
                  key={i}
                  className="photo-item"
                  onClick={() => setSelected(i)}
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.6s ease ${i * 0.07}s`,
                  }}
                >
                  <img src={url} alt={`${titreFormate} ${i + 1}`} loading="lazy" />
                  <div className="photo-item-overlay"><span>Agrandir</span></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Bouton réservation ── */}
        <div style={{ textAlign: 'center', padding: '1rem 2rem 4rem' }}>
          <a
            href="/#reservation"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #1A6DFF, #3A2FD9)',
              color: '#fff', padding: '0.9rem 2.5rem', textDecoration: 'none',
              borderRadius: '4px', fontSize: '0.8rem', letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Réserver une prestation
          </a>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {selected !== null && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', backdropFilter: 'blur(8px)',
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', ...closeBtnStyle }}
          >
            ✕
          </button>

          {selected > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setSelected(i => i - 1) }}
              style={{ position: 'absolute', left: '1rem', ...navBtnStyle }}
            >
              ‹
            </button>
          )}

          <img
            src={gallery.photos[selected]}
            alt={`${titreFormate} ${selected + 1}`}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '88vh',
              objectFit: 'contain', borderRadius: '4px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
            }}
          />

          {selected < gallery.photos.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); setSelected(i => i + 1) }}
              style={{ position: 'absolute', right: '1rem', ...navBtnStyle }}
            >
              ›
            </button>
          )}

          <p style={{
            position: 'absolute', bottom: '1.5rem',
            color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', letterSpacing: '0.1em',
          }}>
            {selected + 1} / {gallery.photos.length}
          </p>
        </div>
      )}
    </>
  )
}

// ── Styles partagés ──────────────────────────────────────────
const btnStyle = {
  background: 'transparent',
  border: '1px solid rgba(26,109,255,0.4)',
  color: '#fff', padding: '0.5rem 1.2rem',
  borderRadius: '4px', cursor: 'pointer',
  fontSize: '0.82rem', letterSpacing: '0.08em',
  fontFamily: 'Cormorant Garamond, serif',
  transition: 'all 0.3s',
}

const closeBtnStyle = {
  background: 'rgba(0,0,0,0.6)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#fff', width: '40px', height: '40px',
  borderRadius: '50%', cursor: 'pointer', fontSize: '1rem',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

const navBtnStyle = {
  background: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#fff', width: '48px', height: '48px',
  borderRadius: '50%', cursor: 'pointer', fontSize: '1.8rem',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  lineHeight: 1,
}