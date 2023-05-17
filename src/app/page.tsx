import Link from "next/link";
import styles from './page.module.css'
import BurgerMenu from "@/components/BurgerMenu";

export default function Home() {
    return (
        <>
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
            <main>
                <section className={styles.section1}>
                    <h1>Développeur Frontend.</h1>
                </section>
            </main>
        </>


    )
}