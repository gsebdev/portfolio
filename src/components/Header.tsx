'use client'

import Link from 'next/link';
import styles from './header.module.scss'
import BurgerMenu from './BurgerMenu';
import { RefObject, useContext, useEffect, useRef } from 'react';
import { HeaderContext } from '@/context';
import { UrlObject } from 'url';
import Underline from '../assets/img/underline.svg'

export interface NavLinkObject {
    href: string | UrlObject;
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
            logoSpanToTranslateRef.current.style.transform = `translate(1.2rem, -2rem)` 
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
                <span>
                    <span>S</span>
                    <span ref={logoSpanToCompactRef} className={styles.spanSmall}>ébastien&nbsp;</span>
                </span>
               
                <span ref={logoSpanToTranslateRef}>
                    <span>G</span>
                    <span className={styles.spanSmall}>ault</span> 
                </span>
                <Underline className={styles.underline} />
                
            </Link>
            <BurgerMenu>
                <ul>
                    {
                        navLinks.map(({ href, name }, index) => {
                            return (
                                <li key={name + index}>
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