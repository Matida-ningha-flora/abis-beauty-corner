'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) setDark(saved === 'dark')
  }, [])

  const toggle = () => {
    setDark(d => {
      localStorage.setItem('theme', !d ? 'dark' : 'light')
      return !d
    })
  }

  const theme = {
    dark,
    toggle,
    colors: dark ? {
      bg: '#0A0A0A',
      bg2: '#0D1B2A',
      bg3: '#111111',
      text: '#FFFFFF',
      textSub: '#B0B0B0',
      border: 'rgba(255,255,255,0.06)',
      navBg: 'rgba(5,5,20,0.95)',
      cardBg: '#111111',
      cardHover: '#0D1B2A',
    } : {
      bg: '#F5F5F0',
      bg2: '#EAE8E0',
      bg3: '#FFFFFF',
      text: '#0A0A0A',
      textSub: '#555555',
      border: 'rgba(0,0,0,0.08)',
      navBg: 'rgba(245,245,240,0.97)',
      cardBg: '#FFFFFF',
      cardHover: '#EAE8E0',
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{
        background: theme.colors.bg,
        color: theme.colors.text,
        minHeight: '100vh',
        transition: 'all 0.4s ease',
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}