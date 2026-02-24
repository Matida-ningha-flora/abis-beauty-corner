import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata = {
  title: "ABI'S BEAUTY CORNER",
  description: "Salon de coiffure, soins de beauté, massages et bien-être",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}