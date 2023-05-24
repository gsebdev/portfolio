'use client'

import { useContext, useRef, useState } from 'react'
import styles from './burgerMenu.module.scss'
import useOutsideClick from '@/hooks/useOusideClick'
import useKeyPressByRef from '@/hooks/useKeyPressByRef'
import { HeaderContext } from '@/context'
interface BurgerMenuProps {
    children: React.ReactNode
    id?: string
}
export default function BurgerMenu({ children, id='main-menu'}: BurgerMenuProps) {
    const [isOpen, setOpen] = useState<true|false>(false)
    const { burgerInverted } = useContext(HeaderContext)
    const navRef = useRef<HTMLElement>(null)
    const burgerRef = useRef<HTMLDivElement>(null)

    //handle click on the burger button
    const onBurgerClick = () => {
        setOpen(isOpen ? false : true)
    }

    //handle click on the link elements
    const handleMenuClick = (e: React.MouseEvent) => {
        const element = e.target as HTMLElement
        if(element.tagName === 'A'){
            setOpen(false)
        }
    }
    //custom hook to handle key press on burger menu
    useKeyPressByRef(burgerRef, onBurgerClick, ['Enter', 'NumpadEnter'])
    useKeyPressByRef(burgerRef, () => {setOpen(false)}, ['Escape'])
    
    //custom hook to close the nave element on outside click
    useOutsideClick(navRef, () => {setOpen(false)}, isOpen)
    
    const line = <div className={`${styles.lines} ${burgerInverted? styles.inverted : ''}`}></div>

    return (
        <div className={styles.menu}>
            <div
                aria-label={`${isOpen ? 'Close' : 'Open' } the navigation menu`}
                aria-controls={id + '-nav'}
                aria-expanded={isOpen}
                tabIndex={0}
                className={`${styles.burger} ${isOpen ? styles.open : ''}`}
                onClick={onBurgerClick}
                ref={burgerRef}
            >
                {line}
                {line}
                {line}
            </div>

            <nav 
                id={id + '-nav'}
                aria-label='Navigatino menu'
                ref={navRef} 
                className={`${styles.navigation} ${isOpen? styles.open : ''}`}
                onClick={handleMenuClick}
            >
                {children}
            </nav>

        </div>
    )
}