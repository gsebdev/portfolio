
import './globals.css'
import styles from './layout.module.scss'
import { PropsWithChildren, useMemo } from 'react'
import {HeaderContextProvider} from '@/context'
import Header from '@/components/Header'


export const metadata = {
  title: 'Sébastien GAULT',
  description: 'Frontend Developper',
}

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const navLinks = useMemo(() => [
    {
      href: '/aaa',
      name: 'CV'
    },
    {
      href: '/bbb',
      name: 'Portfolio',
    },
    {
      href: '/ccc',
      name: 'Contact'
    }
  ], [])

  return (
    <HeaderContextProvider>
      <html lang="fr">
      <body className={styles.home}>
        <Header navLinks={navLinks}/>
        {children}
      </body>
    </html>
    </HeaderContextProvider>
  )
}

export default RootLayout