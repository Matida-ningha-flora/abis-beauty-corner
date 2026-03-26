import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import LanguageProvider from '@/components/LanguageProvider'

export const metadata = {
  title: "ABI'S BEAUTY CORNER",
  description: "Salon de coiffure, soins de beauté, massages et bien-être",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <LanguageProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}