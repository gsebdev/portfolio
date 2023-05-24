'use client'

import { PropsWithChildren, createContext, useState } from "react"

export interface HeaderContextType {
    fullLogo: true | false
    setFullLogo: (fullLogo: true | false) => void
    burgerInverted: true | false
    setBurgerInverted: (fullLogo: true | false) => void
}

const initialHeaderState = {
    fullLogo: true,
    setFullLogo: () => { },
    burgerInverted: false,
    setBurgerInverted: () => { }
}

export const HeaderContext = createContext<HeaderContextType>(initialHeaderState)

export const HeaderContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [fullLogo, setFullLogo] = useState<true | false>(true)
    const [burgerInverted, setBurgerInverted] = useState<true | false>(false)
    return (
        <HeaderContext.Provider value={{ fullLogo, setFullLogo, burgerInverted, setBurgerInverted }}>
            {children}
        </HeaderContext.Provider>
    )
}
