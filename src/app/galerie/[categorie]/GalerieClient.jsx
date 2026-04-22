'use client'
// app/galerie/[categorie]/GalerieClient.jsx
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
    if (e.key === 'Escape') { setSelected(null); return }
    // Ne pas naviguer avec les flèches si c'est une vidéo (l'user contrôle la vidéo)
    if (gallery.medias[selected]?.type === 'video') return
    if (e.key === 'ArrowRight') setSelected(i => Math.min(i + 1, gallery.medias.length - 1))
    if (e.key === 'ArrowLeft') setSelected(i => Math.max(i - 1, 0))
  }, [selected, gallery])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  if (!gallery) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0d1b2a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
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
  const nbImages = gallery.medias.filter(m => m.type === 'image').length
  const nbVideos = gallery.medias.filter(m => m.type === 'video').length

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Great+Vibes&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .media-item {
          height: 240px;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
        }
        .media-item img,
        .media-item video {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease, filter 0.4s ease;
          filter: brightness(0.85);
        }
        .media-item:hover img,
        .media-item:hover video {
          transform: scale(1.04);
          filter: brightness(0.55);
        }
        .media-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s ease;
          border: 1px solid rgba(26,109,255,0.5);
          border-radius: 4px;
        }
        .media-item:hover .media-overlay { opacity: 1; }
        .media-overlay span {
          color: #fff; font-size: 0.75rem;
          letter-spacing: 0.15em; text-transform: uppercase;
        }

        /* Badge vidéo toujours visible */
        .video-badge {
          position: absolute; top: 0.7rem; right: 0.7rem;
          background: rgba(26,109,255,0.9);
          color: #fff; font-size: 0.65rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.2rem 0.5rem; border-radius: 2px;
        }

        /* Bouton play centré sur la thumbnail vidéo */
        .play-btn {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .play-circle {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(26,109,255,0.85);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(26,109,255,0.4);
          transition: transform 0.3s;
        }
        .media-item:hover .play-circle { transform: scale(1.12); }

        @media (max-width: 640px) {
          .media-grid { grid-template-columns: 1fr 1fr; gap: 0.6rem; }
          .media-item { height: 160px; }
        }
        @media (max-width: 380px) {
          .media-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d1b2a', fontFamily: 'Cormorant Garamond, serif' }}>

        {/* ── Header ── */}
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
              {/* Compteur photos + vidéos */}
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', marginTop: '0.6rem', letterSpacing: '0.06em' }}>
                {nbImages > 0 && `${nbImages} photo${nbImages > 1 ? 's' : ''}`}
                {nbImages > 0 && nbVideos > 0 && ' · '}
                {nbVideos > 0 && `${nbVideos} vidéo${nbVideos > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(to right, transparent, #1A6DFF, transparent)',
          }} />
        </div>

        {/* ── Grille médias ── */}
        <div style={{ padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
          {gallery.medias.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.4)' }}>
              <p style={{ fontSize: '1.2rem' }}>Contenu bientôt disponible</p>
            </div>
          ) : (
            <div className="media-grid">
              {gallery.medias.map((media, i) => (
                <div
                  key={i}
                  className="media-item"
                  onClick={() => setSelected(i)}
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.6s ease ${i * 0.07}s`,
                  }}
                >
                  {media.type === 'image' ? (
                    <img src={media.src} alt={`${titreFormate} ${i + 1}`} loading="lazy" />
                  ) : (
                    <>
                      <video
                        src={media.src}
                        poster={media.poster}
                        muted
                        preload="none"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {/* Bouton play */}
                      <div className="play-btn">
                        <div className="play-circle">
                          <span style={{ color: '#fff', fontSize: '1.1rem', marginLeft: '3px' }}>▶</span>
                        </div>
                      </div>
                      {/* Badge VIDÉO */}
                      <span className="video-badge">Vidéo</span>
                    </>
                  )}

                  <div className="media-overlay">
                    <span>{media.type === 'video' ? '▶ Voir la vidéo' : 'Agrandir'}</span>
                  </div>
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
          {/* Fermer */}
          <button
            onClick={() => setSelected(null)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', ...closeBtnStyle }}
          >
            ✕
          </button>

          {/* Précédent */}
          {selected > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setSelected(i => i - 1) }}
              style={{ position: 'absolute', left: '1rem', ...navBtnStyle }}
            >
              ‹
            </button>
          )}

          {/* Média principal */}
          {gallery.medias[selected].type === 'image' ? (
            <img
              src={gallery.medias[selected].src}
              alt={`${titreFormate} ${selected + 1}`}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '90vw', maxHeight: '88vh',
                objectFit: 'contain', borderRadius: '4px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
              }}
            />
          ) : (
            <video
              key={selected} // re-mount à chaque changement de vidéo
              src={gallery.medias[selected].src}
              poster={gallery.medias[selected].poster}
              controls
              autoPlay
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '90vw', maxHeight: '88vh',
                borderRadius: '4px', outline: 'none',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
              }}
            />
          )}

          {/* Suivant */}
          {selected < gallery.medias.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); setSelected(i => i + 1) }}
              style={{ position: 'absolute', right: '1rem', ...navBtnStyle }}
            >
              ›
            </button>
          )}

          {/* Compteur + type */}
          <p style={{
            position: 'absolute', bottom: '1.5rem',
            color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', letterSpacing: '0.1em',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            {gallery.medias[selected].type === 'video' && (
              <span style={{
                background: 'rgba(26,109,255,0.8)', color: '#fff',
                fontSize: '0.65rem', padding: '0.15rem 0.4rem',
                borderRadius: '2px', letterSpacing: '0.08em',
              }}>
                VIDÉO
              </span>
            )}
            {selected + 1} / {gallery.medias.length}
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