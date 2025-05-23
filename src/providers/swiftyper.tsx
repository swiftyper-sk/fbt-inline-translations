import React, { createContext, ReactElement, useContext } from 'react'
import { SwiftyperContextType } from '@/types/SwiftyperContextType'

export const SwiftyperContext = createContext<SwiftyperContextType | null>(null)
export const useSwiftyperContext = () => useContext(SwiftyperContext)

type SwiftyperProviderProps = {
    children: ReactElement
    token: string
    locale: string
    contributor: string
    darkMode?: boolean
}

export const SwiftyperProvider = ({
    children,
    ...props
}: SwiftyperProviderProps) => {
    return (
        <SwiftyperContext.Provider value={props}>
            {children}
        </SwiftyperContext.Provider>
    )
}
