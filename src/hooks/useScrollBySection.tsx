import { useCallback, useEffect, useRef, useState } from "react";

export default function useScrollBySection(container: React.RefObject<HTMLElement>, transitionDuration: number, hideScrollBar: true | false = true) {
    const [activeSection, setActiveSection] = useState<number>(0)
    const [sections, setSections] = useState<HTMLElement[]>([])
    const isTransition = useRef(false)

    //hide body scrollbar if `hideScrollBar`is true
    useEffect(() => {
        if(hideScrollBar) {
            document.body.setAttribute('style', 'overflow: hidden')
        }
        return () => {
            document.body.removeAttribute('style')
        }
    }, [hideScrollBar])

    // get an array of the sections in the container
    useEffect(() => {
        if (container.current) {
            const sections = container.current.children as HTMLCollectionOf<HTMLElement>
            setSections(Array.from(sections))
        }
    }, [container])

    //animate scroll to the active section
    useEffect(() => {

        if (sections[activeSection]) {
            let startTime: number = 0
            const scrollTarget: number = sections[activeSection].offsetTop
            const scrollStart: number = window.scrollY
            const easeInOutQuart = (x: number): number => {
                return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
            }
            const animateScroll = (timeStamp: number) => {
                if (!startTime) startTime = Math.round(timeStamp)

                const time: number = Math.min(((Math.round(timeStamp) - startTime) / transitionDuration), 1)

                const position: number = easeInOutQuart(time)

                if (position < 1) {
                    window.scroll(0, scrollStart + (scrollTarget - scrollStart) * position)
                    requestAnimationFrame(animateScroll)
                } else {
                    window.scroll(0, scrollTarget)
                    isTransition.current = false
                }
            }
            if ((scrollTarget - scrollStart) !== 0) {
                isTransition.current = true
                requestAnimationFrame(animateScroll)
            }

        }

    }, [activeSection, sections, transitionDuration])

    const goToNextSection = useCallback(() => {
        const isSectionBottomVisible = (section: HTMLElement) => {
            const { bottom } = section.getBoundingClientRect()
            return bottom <= window.innerHeight ? true : false
        } // checks if the bottom of the current section is visible
        setActiveSection(a => isSectionBottomVisible(sections[a]) ? Math.min(sections.length - 1, a + 1) : a)
    }, [sections])

    const goToPreviousSection = useCallback(() => {
        const isSectionTopVisible = (section: HTMLElement) => {
            const { top } = section.getBoundingClientRect()
            return top >= 0 ? true : false
        } // checks if the top of the current section is visible
        setActiveSection(a => isSectionTopVisible(sections[a]) ? Math.max(0, a - 1) : a)
    }, [sections])

    //listen for mouse wheel and handle the change of active section
    useEffect(() => {

        // Wheel event handler
        const handleWheel = (e: WheelEvent) => {
            if (isTransition.current) e.preventDefault()
            if (!isTransition.current) {
                switch (Math.sign(e.deltaY)) {
                    case -1:
                        goToPreviousSection()
                        break
                    case 1:
                        goToNextSection()
                        break
                }
            }
        }
        const handleKeydown = (e: KeyboardEvent) => {
            const downKeys = ['Down', 'SpaceBar', ' ', 'ArrowDown', 'PageDown']
            const upKeys = ['Up', 'ArrowUp', 'PageUp']

            if (downKeys.includes(e.key)) {
                goToNextSection()
            }
            if (upKeys.includes(e.key)) {
                goToPreviousSection()
            }

        }
        const handleScroll = (e: Event) => {
            if(!isTransition.current) {
                const sectionIntoView = sections.findIndex(section => {
                    const {top, bottom} = section.getBoundingClientRect()
                    if((top < 0 && bottom <= 0) || (top >= window.innerHeight)) {  // the section is upper the top of the viewport or is under the viewport
                        return false
                    }else {
                        return (top < (window.innerHeight / 2)) && (bottom > (window.innerHeight / 2)) ? true : false // if the section is more than 50% in the viewwport
                    }
                })
                if (sectionIntoView !== -1) setActiveSection(a => a !== sectionIntoView ? sectionIntoView : a) // if found an index setActiveSection only if activeSection changed
                
            }

        }
        
        // Add the event listener
        document.addEventListener('wheel', handleWheel, { passive: false })
        document.addEventListener('keydown', handleKeydown)
        document.addEventListener('scroll', handleScroll)
        // When unmouts remove the event listener
        return () => {
            document.removeEventListener('wheel', handleWheel), { passive: false }
            document.removeEventListener('keydown', handleKeydown)
            document.removeEventListener('scroll', handleScroll)
        }
    }, [sections, goToNextSection, goToPreviousSection])

    return { activeSection, setActiveSection }
}