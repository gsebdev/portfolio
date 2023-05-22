"use client"

import styles from './page.module.scss'
import { useContext, useEffect, useRef, useState } from "react"
import TwoColorsBackground from '@/components/TwoColorsBackground'
import useScrollBySection from '@/hooks/useScrollBySection'
import portrait from '../assets/img/portrait.jpg'
import Image from 'next/image'
import VerticalNav from '@/components/VertivalNav'
import { HeaderContext } from '@/context'

export default function Home() {
    const [bgSecondaryPos, setBgSecondaryPos] = useState(0.33)
    const mainRef = useRef(null)
    const { activeSection, setActiveSection } = useScrollBySection(mainRef, 500)
    
    const { setFullLogo } = useContext(HeaderContext)

    //handle the background modification when section change
    useEffect(() => {
        const bgPos = [0.33, 0.28, 0.30]
        setBgSecondaryPos(bgPos[activeSection])
        activeSection === 0 ? setFullLogo(true) : setFullLogo(false)
    }, [activeSection, setFullLogo])

    return (
        <>
            <VerticalNav
                items={['Home', 'Profile', 'About']}
                callback={(i: number) => {setActiveSection(i)}}
                position={activeSection}
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