'use client'
import { useTheme } from './ThemeProvider'
import { useLanguage } from './LanguageProvider'
import { useEffect, useRef, useState } from 'react'

const photos = [
  'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3998421/pexels-photo-3998421.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&w=600',
  'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&w=600',
]

export default function Gallery() {
  const [visible, setVisible] = useState(false)
  const { colors } = useTheme()
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
      <style>{`
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem; max-width: 1100px; margin: 0 auto; }
        .gallery-item-tall { height: 400px; }
        .gallery-item-normal { height: 280px; }
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-item-tall { height: 250px !important; }
          .gallery-item-normal { height: 220px !important; }
        }
      `}</style>

      <section id="galerie" ref={ref} style={{ padding: '6rem 1.5rem', background: colors.bg, position: 'relative', transition: 'background 0.4s ease' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, #3A2FD9, transparent)' }} />

        <div style={{ textAlign: 'center', marginBottom: '4rem', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.8rem', color: '#1A6DFF', marginBottom: '0.5rem' }}>{t.gallery.tag}</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '700', color: colors.text }}>{t.gallery.titre}</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(26,109,255,0.5)' }} />
            <span style={{ color: '#1A6DFF' }}>✦</span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(26,109,255,0.5)' }} />
          </div>
        </div>

        <div className="gallery-grid">
          {photos.map((url, i) => (
            <GalleryItem key={i} url={url} label={t.gallery.labels[i]} index={i} visible={visible} />
          ))}
        </div>
      </section>
    </>
  )
}

function GalleryItem({ url, label, index, visible }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className={index === 0 || index === 3 ? 'gallery-item-tall' : 'gallery-item-normal'}
      style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: `all 0.7s ease ${index * 0.1}s`, cursor: 'pointer' }}
    >
      <img src={url} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.6s ease', filter: hovered ? 'brightness(0.4)' : 'brightness(0.55)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '1.5rem', background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 60%)' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#fff', opacity: hovered ? 1 : 0.7, transition: 'all 0.3s', transform: hovered ? 'translateY(0)' : 'translateY(5px)' }}>{label}</span>
      </div>
      {hovered && <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(26,109,255,0.5)', borderRadius: '4px', pointerEvents: 'none' }} />}
    </div>
  )
}