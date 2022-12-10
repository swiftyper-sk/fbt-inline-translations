import React, { ReactElement, useContext, useEffect } from 'react'
import { useSwiftyperContext } from '../providers/swiftyper'
// eslint-disable-next-line
// @ts-ignore
import { Swiftyper } from 'swiftyper-node'
import SwiftyperService from '../services/SwiftyperService'

const UserServiceContext = React.createContext<SwiftyperService | null>(null)

export const useSwiftyperServiceContext = () => useContext(UserServiceContext)

const client = new Swiftyper()

const swiftyperServiceInstance = new SwiftyperService(client)

type Props = {
    children: ReactElement
}

export const SwiftyperServiceProvider = (props: Props) => {
    const swiftyper = useSwiftyperContext()

    useEffect(() => {
        const { token, locale, contributor } = swiftyper!

        client._setApiKey(token)
        swiftyperServiceInstance.contributor = contributor
        swiftyperServiceInstance.locale = locale
    }, [swiftyper])

    return (
        <UserServiceContext.Provider
            value={swiftyperServiceInstance}
            {...props}
        />
    )
}
