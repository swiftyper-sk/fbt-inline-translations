import React, { useContext } from 'react'
import SwiftyperService from '@/services/SwiftyperService'

export const SwiftyperServiceContext =
    React.createContext<SwiftyperService | null>(null)

export const useSwiftyperServiceContext = () =>
    useContext(SwiftyperServiceContext)
