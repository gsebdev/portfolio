
import './globals.scss'
import { PropsWithChildren, useMemo } from 'react'
import { HeaderContextProvider } from '@/context'
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
      href: {pathname: '/', query: {section: 'contact'}},
      name: 'Contact'
    }
  ], [])

  return (
    <HeaderContextProvider>
        <html lang="fr">
          <body>
            <Header navLinks={navLinks} />
            {children}
          </body>
        </html>
    </HeaderContextProvider>
  )
}

export default RootLayout