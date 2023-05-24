'use client'

import Link from 'next/link';
import styles from './header.module.scss'
import BurgerMenu from './BurgerMenu';
import { RefObject, useContext, useEffect, useRef } from 'react';
import { HeaderContext } from '@/context';

export interface NavLinkObject {
    href: string;
    name: string;
}

const Header: React.FC<{ navLinks: NavLinkObject[] }> = ({ navLinks }) => {
    const { fullLogo } = useContext(HeaderContext)
    const logoSpanToCompactRef: RefObject<HTMLElement> = useRef(null)
    const logoSpanToTranslateRef: RefObject<HTMLElement> = useRef(null)
    
    useEffect(() => {
        if (logoSpanToCompactRef.current && logoSpanToTranslateRef.current) {
            if(!fullLogo) {
               const width = logoSpanToCompactRef.current.offsetWidth
            logoSpanToTranslateRef.current.style.transform = `translateX(-${width}px)` 
            }else {
                logoSpanToTranslateRef.current.style.transform = ''
            }
            

        }
    })

    return (
        <header className={styles.header}>
            <Link
                href="/"
                className={`${styles.logo} ${fullLogo ? '' : styles.contracted}`}
                aria-label="Logo, Aller à la page d'accueil"
            >
                <span>S</span>
                <span ref={logoSpanToCompactRef} className={styles.spanSmall}>ébastien&nbsp;</span>
                <span ref={logoSpanToTranslateRef}>
                    <span>G</span>
                    <span className={styles.spanSmall}>ault</span> 
                </span>
                
            </Link>
            <BurgerMenu>
                <ul>
                    {
                        navLinks.map(({ href, name }: { href: string, name: string }, index: number) => {
                            return (
                                <li key={href + index}>
                                    <Link href={href}>{name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </BurgerMenu>
        </header>
    )
}

export default Header