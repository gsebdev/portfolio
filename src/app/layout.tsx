
import './globals.scss'
import { PropsWithChildren, useMemo } from 'react'
import { HeaderContextProvider, ScrollContextProvider } from '@/context'
import Header from '@/components/Header'

export const metadata = {
  title: 'Sébastien GAULT',
  description: 'Frontend Developper',
}

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const navLinks = useMemo(() => [
    {
      href: '/portfolio',
      name: 'CV'
    },
    {
      href: '/bbb',
      name: 'Portfolio',
    },
    {
      href: { pathname: '/', query: { section: 'contact' } },
      name: 'Contact'
    }
  ], [])

  return (
    <ScrollContextProvider>
      <HeaderContextProvider>
        <html lang="fr">
          <body>
            <Header navLinks={navLinks} />
            {children}
          </body>
        </html>
      </HeaderContextProvider>
    </ScrollContextProvider>

  )
}

export default RootLayout