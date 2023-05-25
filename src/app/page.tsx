"use client"

import styles from './page.module.scss'
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import TwoColorsBackground from '@/components/TwoColorsBackground'
import useScrollBySection from '@/hooks/useScrollBySection'
import portrait from '../assets/img/portrait.jpg'
import Image from 'next/image'
import VerticalNav from '@/components/VertivalNav'
import { HeaderContext } from '@/context'
import TimeLine from '@/components/TimeLine'

export default function Home() {
    const [bgSecondaryPos, setBgSecondaryPos] = useState(0.33)
    const mainRef = useRef(null)
    const { activeSection, setActiveSection } = useScrollBySection(mainRef, 500)

    const { setFullLogo, setBurgerInverted } = useContext(HeaderContext)
    const invertedSections = useMemo(() => [1], [])
    const bio = [
        {
            title: 'Mes premières lignes de code',
            time: '2005',
            content: 'L\'histoire commence au lycée, lorsque pendant mon temps libre je programme sur ma calculatrice de petits jeux en TI basic'
        },
        {
            title: 'Début de carrière dans l\'Audiovisuel',
            time: '2008',
            content: 'Je commence ma carrière en post-production audiovisuelle après avoir obtenu un BTS Audiovisuel et une Licence De Cinéma'
        },
        {
            title: 'Voyages',
            time: '2012',
            content: 'Australie, Nouvelle-Zélande, Amérique du Sud'
        },
        {
            title: 'Encadrement de sports d\'eaux-vives',
            time: '2014',
            content: ''
        },
        {
            title: 'Co-fondation de YOURAFT Serre Chevalier',
            time: '2019',
            content: ''
        },
        {
            title: 'Développement Web',
            time: '2020',
            content: ''
        }
    ]
    //handle the background modification when section change
    useEffect(() => {
        const bgPos = [0.25, 0, 0.5, 1]
        setBgSecondaryPos(bgPos[activeSection])
        activeSection === 0 ? setFullLogo(true) : setFullLogo(false)
        invertedSections.includes(activeSection) ? setBurgerInverted(true) : setBurgerInverted(false)
    }, [activeSection, setFullLogo, setBurgerInverted, invertedSections])

    return (
        <>
            <VerticalNav
                items={['Home', 'Profile', 'About', 'AAA']}
                callback={(i: number) => { setActiveSection(i) }}
                position={activeSection}
                invertedColors={invertedSections.includes(activeSection) ? true : false}
            />
            <TwoColorsBackground position={bgSecondaryPos} />
            <main className={styles.main} ref={mainRef}>

                <section id="intro" className={`${styles.section1} ${activeSection === 0 ? styles.active : ''}`}>
                    <h1>Développeur<br />Frontend.</h1>
                    <p>J&apos;aime développer des applications avec des expériences utilisateur innovantes et performantes</p>
                    <div>
                        <ul>
                            <li>e Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de ble des morceaux de texte pour réaliser un livre spécimen de polices de texte. </li>
                            <li>e Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de spécimen de polices de text</li>

                        </ul>

                    </div>
                    <div className={styles.portrait}>
                        <Image
                            src={portrait}
                            alt="photo de Sébastien Gault"
                            fill={true}
                            loading='lazy'
                            sizes="(max-width: 2048px) 30vw, (max-width: 768px) 50vw"
                            placeholder='blur' />
                    </div>

                </section>
                <section id="story" className={`${styles.section2} ${activeSection === 1 ? styles.active : ''}`}>
                    <h2>Ma Story</h2>
                    <div>
                        <TimeLine timelineElements={bio} />
                    </div>
                </section>
                <section id="about" className={`${styles.section3} ${activeSection === 2 ? styles.active : ''}`}>
                    <div>
                        <h2>Je code & crée des applications</h2>
                        <p>Sites web, PWA, packages et projets perso</p>
                        <button className={styles.cta}>Voir mon travail</button>
                    </div>
                    <div>
                        <h2>Mon parcours de formations</h2>
                        <ul>
                            <li>OpenClasroom</li>
                            <li>Cinéma</li>
                            <li>BTS Audiovisuel</li>
                        </ul>
                    </div>
                </section>
                <section id="about" className={`${styles.section2} ${activeSection === 3 ? styles.active : ''}`}>
                    <h2>Me contacter</h2>
                    <p>Nhesitez pas à envoyer un message pour discuter ou pour une demande</p>
                </section>
            </main>
        </>

    )
}