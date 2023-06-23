'use client'

import Link from 'next/link'
import styles from './header.module.scss'
import BurgerMenu from './BurgerMenu'
import { RefObject, useState, useEffect, useRef, useCallback } from 'react'
import { UrlObject } from 'url'


export interface NavLinkObject {
    href: string | UrlObject
    name: string;
}

const Header: React.FC<{ navLinks: NavLinkObject[] }> = ({ navLinks }) => {
    const [fullLogo, setFullLogo] = useState<boolean>(true)
    const firstCapitalRef: RefObject<HTMLElement> = useRef(null)
    const logoSpanToTranslateRef: RefObject<HTMLElement> = useRef(null)
    const underlineToTransformRef: RefObject<HTMLElement> = useRef(null)

    const handleFullLogo: () => void = useCallback(() => {
        if (window.scrollY <= 50) {
            setFullLogo(true)
        } else {
            setFullLogo(false)
        }
    }, [])

    const contractLogo = useCallback(() => {
            const width = firstCapitalRef.current ? firstCapitalRef.current.offsetWidth : 0
            const height = firstCapitalRef.current ? firstCapitalRef.current.offsetHeight : 0
            if (logoSpanToTranslateRef.current) logoSpanToTranslateRef.current.style.transform = `translate(${width}px, -${height}px)`
            if (underlineToTransformRef.current) underlineToTransformRef.current.style.transform = `translate(0, -${height}px) rotate(15deg) scaleX(0.4) scaleY(0.8)`
    }, [])

    const releaseLogo = useCallback(() => {
        if (logoSpanToTranslateRef.current) logoSpanToTranslateRef.current.style.transform = ''
        if (underlineToTransformRef.current) underlineToTransformRef.current.style.transform = ''
    }, [])

    const handleWindowResize = useCallback(() => {
        if(!fullLogo) contractLogo()
    }, [fullLogo, contractLogo])

    useEffect(() => {
        if (!fullLogo) {
            contractLogo()
        } else {
           releaseLogo()
        }
    })
    useEffect(() => {
        window.addEventListener('scroll', handleFullLogo)
        window.addEventListener('resize', handleWindowResize)
        return (() => {
            window.removeEventListener('scroll', handleFullLogo)
            window.removeEventListener('resize', handleWindowResize)
        })
    })
    return (
        <header className={styles.header}>
            <Link
                href="/"
                className={`${styles.logo} ${fullLogo ? '' : styles.contracted}`}
                aria-label="Logo, Aller à la page d'accueil"
            >
                <span>
                    <span ref={firstCapitalRef}>S</span>
                    <span className={styles.spanSmall}>ébastien&nbsp;</span>
                </span>

                <span ref={logoSpanToTranslateRef}>
                    <span>G</span>
                    <span className={styles.spanSmall}>ault</span>
                </span>
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