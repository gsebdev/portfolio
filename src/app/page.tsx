import Link from "next/link";
import styles from './page.module.css'
import BurgerMenu from "@/components/BurgerMenu";

export default function Home() {
    return (
        <main>
            <section id="intro" className={styles.section1}>
                <h1>Développeur Frontend.</h1>
            </section>
            <section id="profil" className={styles.section2}>
                <h2>Profil</h2>
            </section>
        </main>
    )
}