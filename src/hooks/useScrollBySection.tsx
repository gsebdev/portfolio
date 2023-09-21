import { useCallback, useEffect, useRef, useState } from "react";
interface useScrollBySectionReturnProps {
    activeSection: number,
    setActiveSection: (newActiveSection: number) => void
}
interface wheelRunRefProps {
    lastEvent: WheelEvent | null
    maxDeltaValue: number
    timeout: NodeJS.Timeout | null
    wheeling: boolean
}

const useScrollBySection = (container: React.RefObject<HTMLElement>, transitionDuration: number, hideScrollBar: boolean = true, autoScroll: boolean = true, stopScroll = false): useScrollBySectionReturnProps => {
    const [activeSection, setActiveSection] = useState<number>(0)
    const [sections, setSections] = useState<HTMLElement[]>([])
    const activeSectionRef = useRef<HTMLElement | null>(null)
    const isTransition = useRef<boolean>(false)
    const wheelRun = useRef<wheelRunRefProps>({
        lastEvent: null,
        maxDeltaValue: 0,
        timeout: null,
        wheeling: false
    })

    //Callback function to animate the scroll to the active section
    const animateScrollTo = useCallback((scrollTarget: number) => {
        let startTime: number = 0
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
    }, [transitionDuration])

    //test if section is into viewport
    const isSectionIntoView = useCallback((section: HTMLElement) => {
        const { top, bottom } = section.getBoundingClientRect()
        if ((top < 0 && bottom <= 0) || (top >= window.innerHeight)) {  // the section is upper the top of the viewport or is under the viewport
            return false
        } else {
            return (top < (window.innerHeight / 2)) && (bottom > (window.innerHeight / 2)) ? true : false // if the section is more than 50% in the viewwport
        }
    }, [])

    useEffect(() => {
        if (container.current) {
            setSections(Array.from(container.current.children as HTMLCollectionOf<HTMLElement>))
        }
    }, [container])

    // effect to scroll to the active section
    useEffect(() => {
        activeSectionRef.current = sections[activeSection]
        if (activeSectionRef.current && !isSectionIntoView(activeSectionRef.current)) animateScrollTo(activeSectionRef.current.offsetTop)
    }, [activeSection, sections, animateScrollTo, isSectionIntoView])

    //hide body scrollbar if `hideScrollBar`is true
    useEffect(() => {
        const style = document.createElement('style')
        if (hideScrollBar) {
            style.innerHTML = `
                body::-webkit-scrollbar {
                    display: none;
                };
                body {
                    -ms-overflow-style: none;
                    scrollbar-width: none; 
                }
            `
            const head = document.querySelector('head')
            head?.appendChild(style)
        }
        return () => {
            style.remove()
        }
    }, [hideScrollBar])

    const scrollNext = useCallback(() => {
        const section: HTMLElement | null = activeSectionRef.current
        if (section) {
            const { bottom } = section.getBoundingClientRect()
            //if bottom of the section is visible
            if (Math.floor(bottom) <= window.innerHeight + 1) {
                setActiveSection(a => Math.min(sections.length - 1, a + 1))
            } else {
                const scrollTarget = Math.round(window.scrollY + Math.min(window.innerHeight * 0.67, bottom - window.innerHeight))
                animateScrollTo(scrollTarget)
            }
        }
    }, [animateScrollTo, sections])

    const scrollPrev = useCallback(() => {
        const section: HTMLElement | null = activeSectionRef.current
        if (section) {
            const { top } = section.getBoundingClientRect()
            //if top of the section is visible
            if (Math.ceil(top) >= -1) {
                setActiveSection(a => Math.max(0, a - 1))
            } else {
                const scrollTarget = Math.floor(window.scrollY - Math.min(Math.abs(top), window.innerHeight * 0.67))
                animateScrollTo(scrollTarget)
            }
        }
    }, [animateScrollTo])

    //listen for mouse wheel and handle the change of active section
    useEffect(() => {
        // Wheel event handler
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()
            const resetWheelRun = () => {
                wheelRun.current = {
                    lastEvent: null,
                    maxDeltaValue: 0,
                    timeout: null,
                    wheeling: false
                }
            }
            const wRun = wheelRun.current
            // starts a new wheel run record
            if (!wRun.wheeling) {
                wRun.maxDeltaValue = Math.abs(e.deltaY)
                wRun.timeout = setTimeout(() => { resetWheelRun() }, 250)
                wRun.wheeling = true
            } else {
                //update the current wheel run record
                if (wRun.timeout !== null) clearTimeout(wRun.timeout)
                wRun.maxDeltaValue = Math.max(wRun.maxDeltaValue, Math.abs(e.deltaY))
                wRun.timeout = setTimeout(() => { resetWheelRun() }, 250)
            }
            const isDirectionChanging: boolean = !wRun.lastEvent || Math.sign(wRun.lastEvent.deltaY) !== Math.sign(e.deltaY)
            const isWheelingFast: boolean = Math.abs(e.deltaY) >= wRun.maxDeltaValue / 3

            if (!isTransition.current && (isDirectionChanging || isWheelingFast)) {
                switch (Math.sign(e.deltaY)) {
                    case -1:
                        scrollPrev()
                        break
                    case 1:
                        scrollNext()
                        break
                }
            }
            wRun.lastEvent = e
        }

        const handleKeydown = (e: KeyboardEvent) => {
            const downKeys = ['Down', 'ArrowDown', 'PageDown']
            const upKeys = ['Up', 'ArrowUp', 'PageUp']

            if (downKeys.includes(e.key)) scrollNext()
            if (upKeys.includes(e.key)) scrollPrev()

        }

        const handleScroll = () => {
            //spy active section
            if (!isTransition.current) {
                const sectionIntoView = sections.findIndex(section => {
                    return isSectionIntoView(section)
                })
                if (sectionIntoView !== -1) setActiveSection(a => a !== sectionIntoView ? sectionIntoView : a) // if found an index setActiveSection only if activeSection changed    
            }
        }

        const handleWindowResize = () => {
            isTransition.current = true
            if (activeSectionRef.current) window.scroll(0, activeSectionRef.current.offsetTop)
            isTransition.current = false
        }

        // Add the event listener
        if (autoScroll && !stopScroll) {
            document.addEventListener('keydown', handleKeydown)
            document.addEventListener('wheel', handleWheel, { passive: false })
        }
        document.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleWindowResize)
        // When unmouts remove the event listener
        return () => {
            document.removeEventListener('keydown', handleKeydown)
            document.removeEventListener('wheel', handleWheel)
            document.removeEventListener('keydown', handleKeydown)
            document.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [autoScroll, scrollNext, scrollPrev, sections, isSectionIntoView, stopScroll, container])

    return { activeSection, setActiveSection }
}

export default useScrollBySection