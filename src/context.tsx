'use client'

import { PropsWithChildren, createContext, useState } from "react"

export interface HeaderContextType {
    fullLogo: boolean;
    setFullLogo: (fullLogo: boolean) => void
    burgerInverted: boolean;
    setBurgerInverted: (burgerInverted: boolean) => void
}

const initialHeaderState: HeaderContextType = {
    fullLogo: true,
    setFullLogo: () => {},
    burgerInverted: false,
    setBurgerInverted: () => {}
};

export const HeaderContext = createContext<HeaderContextType>(initialHeaderState)

export const HeaderContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [fullLogo, setFullLogo] = useState<boolean>(true)
    const [burgerInverted, setBurgerInverted] = useState<boolean>(false)

    return (
        <HeaderContext.Provider value={{ fullLogo, setFullLogo, burgerInverted, setBurgerInverted }}>
            {children}
        </HeaderContext.Provider>
    )
}

export interface ScrollContextValue {
    stopMainScroll: boolean;
    setStopMainScroll: (value: boolean) => void;
}

export const ScrollContext = createContext<ScrollContextValue>({
    stopMainScroll: false,
    setStopMainScroll: () => {}
})

export const ScrollContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [ stopMainScroll, setStopMainScroll ] = useState<boolean>(false)
    return (
        <ScrollContext.Provider value={{ stopMainScroll, setStopMainScroll }}>
            {children}
        </ScrollContext.Provider>

    )
}
