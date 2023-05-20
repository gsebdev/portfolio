
import './globals.css'
import Link from "next/link"
import BurgerMenu from "@/components/BurgerMenu"
import styles from './layout.module.css'

export const metadata = {
  title: 'Sébastien GAULT',
  description: 'Frontend Developper',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  

  return (
    <html lang="fr">
      <body>
        <header className={styles.header}>
          <Link href='/' className={styles.logo} aria-label="Logo, Aller à la page d'accueil">S_G</Link>
          <BurgerMenu>
            <ul>
              <li><Link href='/aaa'>CV</Link></li>
              <li><Link href='/bbb'>Portfolio</Link></li>
              <li><Link href='/ccc'>Contact</Link></li>
            </ul>
          </BurgerMenu>
        </header>
        {children}
      </body>
    </html>
  )
}
