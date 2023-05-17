'use client'

import { useState } from 'react'
import styles from './burgerMenu.module.css'

export default function BurgerMenu({ children, color }: { children: React.ReactNode, color?: string|undefined }) {
    const [isOpen, setOpen] = useState<Boolean>(false)

    const onBurgerClick = () => {
        setOpen(isOpen ? false : true)
    }
    
    const line = <div className={styles.lines} style={{ background: color }}></div>

    return (
        <div className={styles.menu}>
            <div
                className={`${styles.burger} ${isOpen ? styles.open : ''}`}
                onClick={onBurgerClick}
            >
                {line}
                {line}
                {line}
            </div>

            <nav className={`${styles.navigation} ${isOpen? styles.open : ''}`}>
                {children}
            </nav>

        </div>
    )
}