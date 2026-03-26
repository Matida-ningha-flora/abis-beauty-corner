'use client'
import { useTheme } from './ThemeProvider'
import { useLanguage } from './LanguageProvider'

export default function Footer() {
  const { colors, dark } = useTheme()
  const { t } = useLanguage()

  return (
    <footer style={{ background: dark ? '#110e48' : '#EAE8E0', padding: '2rem 1rem 3rem', borderTop: '1px solid rgba(26,109,255,0.2)', transition: 'background 0.4s ease' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

        <div>
          <img src="/logo.png" alt="ABI'S BEAUTY CORNER" style={{ height: '90px', width: 'auto', display: 'block', filter: dark ? 'brightness(0) invert(1)' : 'none', marginBottom: '1rem', transition: 'filter 0.4s ease' }} />
          <p style={{ color: colors.textSub, fontSize: '0.85rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>{t.footer.description}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['Instagram', 'Facebook', 'TikTok'].map(r => (
              <a key={r} href="#" style={{ color: colors.textSub, fontSize: '0.75rem', letterSpacing: '0.05em', textDecoration: 'none', padding: '0.4rem 0.8rem', border: `1px solid ${colors.border}`, borderRadius: '2px', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1A6DFF'; e.currentTarget.style.color = '#1A6DFF' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.color = colors.textSub }}
              >{r}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', marginBottom: '1.5rem', color: colors.text }}>{t.footer.nos_services}</h4>
          {t.footer.services.map(s => (
            <a key={s} href="#services" style={{ display: 'block', color: colors.textSub, textDecoration: 'none', fontSize: '0.85rem', marginBottom: '0.6rem', transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#1A6DFF'}
              onMouseLeave={e => e.currentTarget.style.color = colors.textSub}
            >→ {s}</a>
          ))}
        </div>

        <div>
          <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', marginBottom: '1.5rem', color: colors.text }}>{t.footer.contact}</h4>
          {[
            { icon: '📍', text: t.footer.adresse },
            { icon: '📞', text: '+237 683 428 378' },
            { icon: '✉️', text: 'contact@abisbeautycorner.com' },
            { icon: '🕐', text: t.footer.horaires },
          ].map((item) => (
            <p key={item.text} style={{ color: colors.textSub, fontSize: '0.85rem', marginBottom: '0.8rem', display: 'flex', gap: '0.5rem' }}>
              <span>{item.icon}</span> {item.text}
            </p>
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: colors.textSub, fontSize: '0.8rem' }}>{t.footer.copyright}</p>
        <p style={{ color: colors.textSub, fontSize: '0.8rem' }}>
          {t.footer.credit.replace('♥', '')} <span style={{ color: '#1A6DFF' }}>♥</span> {t.footer.credit.split('♥')[1]}
        </p>
      </div>
    </footer>
  )
}