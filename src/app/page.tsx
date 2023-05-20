"use client"

import styles from './page.module.scss'
import { useEffect, useRef, useState } from "react"
import TwoColorsBackground from '@/components/TwoColorsBackground'
import useScrollBySection from '@/hooks/useScrollBySection'

export default function Home() {
    const [bgSecondaryPos, setBgSecondaryPos] = useState(0.33)
    const mainRef = useRef(null)
    const { activeSection } = useScrollBySection(mainRef, 500)

    //handle the background modification when section change
    useEffect(() => {
        const bgPos = activeSection === 3 ? 0.5 : 0.33 - ((activeSection - 1) * 0.1)
        setBgSecondaryPos(bgPos)
    }, [activeSection])

    return (
        <>
            <TwoColorsBackground position={bgSecondaryPos} />
            <main className={styles.main} ref={mainRef}>

                <section id="intro" className={`${styles.section1}`}>
                    <h1>Développeur<br />Frontend.</h1>
                    <p>I like to craft solid and scalable frontend products with great user experiences.</p>
                </section>
                <section id="profil" className={`${styles.section2} ${activeSection === 1 ? styles.active : ''}`}>
                    <h2>Profil</h2>
                    <p>sdkfskfjskldjfss
                        dfsd
                        fsdfsdfsdfsdfsdf
                        sdkfskfjskldjfsssdf
                        sd
                        fsdfsdfsdfsdfsdf
                    </p>
                </section>
                <section id="about" className={`${styles.section2} ${activeSection === 2 ? styles.active : ''}`}>
                    <h2>About</h2>
                    <p>sdkfskfjskldjfss
                        dfsd
                        fsdfsdfsdfsdfsdf
                        sdkfskfjskldjfsssdf
                        sd
                        fsdfsdfsdfsdfsdf
                    </p>
                </section>
            </main>
        </>

    )
}