"use client"

import styles from './page.module.scss'
import { useContext, useEffect, useRef } from "react"
import useScrollBySection from '@/hooks/useScrollBySection'
import VerticalNav from '@/components/VertivalNav'
import { HeaderContext, ScrollContext } from '@/context'

import FirstSection from '@/sections/FirstSection'
import SkillsSection from '@/sections/SkillsSection'
import StorySection from '@/sections/StorySection'
import AboutSection from '@/sections/AboutSection'
import ContactSection from '@/sections/ContactSection'
import AnimatedBackground from '@/components/AnimaterdBackground'

//set an array of sections index for inverted nav elements colors  
const invertedColorsSections = [2]
console.log("Hey %cThis is so cool", "background-color: pink; color: black")
console.log("  /\\_/\\ \n ( o.o )\n  > ^ <");
const Home: React.FC = () => {
    const mainRef = useRef(null)
    const { stopMainScroll } = useContext(ScrollContext)
    const { activeSection, setActiveSection } = useScrollBySection(mainRef, 500, true, true, stopMainScroll)
    const { setBurgerInverted } = useContext(HeaderContext)

    //handle the logo state and inverted color for nav elements
    useEffect(() => {
        invertedColorsSections.includes(activeSection) ? setBurgerInverted(true) : setBurgerInverted(false)
    }, [activeSection, setBurgerInverted])

    return (
        <>  
            <AnimatedBackground positionNumber={activeSection + 1} />
            <VerticalNav
                items={['Home', 'Skills', 'Story', 'Work & Formations', 'Contact']}
                callback={(i: number) => { setActiveSection(i) }}
                position={activeSection}
                invertedColors={invertedColorsSections.includes(activeSection) ? true : false}
            />
            <main className={styles.main} ref={mainRef}>
                <FirstSection id='intro' active={activeSection === 0} />
                <SkillsSection id='skills' active={activeSection === 1} />
                <StorySection id='story' active={activeSection === 2} />
                <AboutSection id='about' active={activeSection === 3} />
                <ContactSection id='contact' active={activeSection === 4} />
            </main>
        </>
    )
}

export default Home