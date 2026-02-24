'use client'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from './ThemeProvider'

const services = ['Coiffure', 'Soins capillaires', 'Soin du visage', 'Massage', 'Épilation & beauté', 'Forfait premium']

export default function Booking() {
  const [form, setForm] = useState({ nom: '', telephone: '', service: '', date: '', heure: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [focused, setFocused] = useState('')
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

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const message = `Bonjour Abis Beauty Corner ! 👋\n\nJe souhaite réserver un rendez-vous :\n\n👤 Nom : ${form.nom}\n📞 Téléphone : ${form.telephone}\n💅 Service : ${form.service}\n📅 Date : ${form.date}\n⏰ Heure : ${form.heure}\n${form.message ? `💬 Message : ${form.message}` : ''}\n\nMerci !`
    const url = `https://wa.me/237683428378?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    setSent(true)
  }

  const inputStyle = (name) => ({
    width: '100%',
    background: focused === name ? 'rgba(26,109,255,0.05)' : colors.bg3,
    border: `1px solid ${focused === name ? '#1A6DFF' : colors.border}`,
    borderRadius: '4px',
    padding: '0.9rem 1rem',
    color: colors.text,
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.3s',
    boxSizing: 'border-box',
  })

  return (
    <>
      <style>{`
        .booking-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .booking-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section id="reservation" ref={ref} style={{
        padding: '7rem 1.5rem',
        background: colors.bg,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.4s ease',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, #3A2FD9, transparent)' }} />

        <div style={{
          position: 'absolute', left: '-150px', bottom: '-150px',
          width: '400px', height: '400px',
          border: '1px solid rgba(26,109,255,0.06)',
          borderRadius: '50%', animation: 'rotateSlow 35s linear infinite',
        }} />

        <div style={{
          maxWidth: '700px', margin: '0 auto',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.9s ease',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.8rem', color: '#1A6DFF', marginBottom: '0.5rem' }}>
              Prenez soin de vous
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: '700', color: colors.text }}>
              Réservez Votre Moment
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ width: '40px', height: '1px', background: 'rgba(26,109,255,0.5)' }} />
              <span style={{ color: '#1A6DFF' }}>✦</span>
              <div style={{ width: '40px', height: '1px', background: 'rgba(26,109,255,0.5)' }} />
            </div>
          </div>

          {sent ? (
            <div style={{
              textAlign: 'center', padding: '3rem',
              border: '1px solid rgba(26,109,255,0.3)',
              borderRadius: '8px', background: 'rgba(26,109,255,0.05)',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✦</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', marginBottom: '1rem', color: colors.text }}>
                Demande envoyée !
              </h3>
              <p style={{ color: colors.textSub }}>Nous vous contacterons très bientôt pour confirmer votre rendez-vous.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="booking-row">
                <input name="nom" placeholder="Votre nom" value={form.nom} onChange={handle} required
                  style={inputStyle('nom')} onFocus={() => setFocused('nom')} onBlur={() => setFocused('')} />
                <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handle} required
                  style={inputStyle('telephone')} onFocus={() => setFocused('telephone')} onBlur={() => setFocused('')} />
              </div>

              <select name="service" value={form.service} onChange={handle} required
                style={{ ...inputStyle('service'), appearance: 'none' }}
                onFocus={() => setFocused('service')} onBlur={() => setFocused('')}>
                <option value="">Choisir un service</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <div className="booking-row">
                <input name="date" type="date" value={form.date} onChange={handle} required
                  style={inputStyle('date')} onFocus={() => setFocused('date')} onBlur={() => setFocused('')} />
                <input name="heure" type="time" value={form.heure} onChange={handle} required
                  style={inputStyle('heure')} onFocus={() => setFocused('heure')} onBlur={() => setFocused('')} />
              </div>

              <textarea name="message" placeholder="Message (optionnel)" value={form.message} onChange={handle}
                rows={4} style={{ ...inputStyle('message'), resize: 'vertical' }}
                onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />

              <button type="submit" disabled={loading} style={{
                background: loading ? 'rgba(26,109,255,0.5)' : 'linear-gradient(135deg, #1A6DFF, #3A2FD9)',
                color: '#fff', padding: '1.1rem',
                border: 'none', borderRadius: '4px',
                fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer', transition: 'transform 0.3s',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {loading ? 'Envoi en cours...' : 'Confirmer ma Réservation ✦'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}