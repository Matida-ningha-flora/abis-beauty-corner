'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext()

export function useLanguage() {
  return useContext(LanguageContext)
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr')

  useEffect(() => {
    const saved = localStorage.getItem('lang')
    if (saved) setLang(saved)
  }, [])

  const toggle = () => {
    setLang(l => {
      const next = l === 'fr' ? 'en' : 'fr'
      localStorage.setItem('lang', next)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}