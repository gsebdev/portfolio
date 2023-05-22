'use client'

import { PropsWithChildren, createContext, useState } from "react"

export interface HeaderContextType {
    fullLogo: true | false
    setFullLogo: (fullLogo: true | false) => void
}
const initialHeaderState = {
    fullLogo: true,
    setFullLogo: () => {}
} 
export const HeaderContext  = createContext<HeaderContextType>(initialHeaderState)

export const HeaderContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [ fullLogo, setFullLogo ] = useState<true | false>(true)
    return (
        <HeaderContext.Provider value={{fullLogo, setFullLogo}}>
            {children}
        </HeaderContext.Provider>
    )
}
