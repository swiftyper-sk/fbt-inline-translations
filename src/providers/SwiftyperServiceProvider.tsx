import React, { ReactElement, useEffect } from 'react'
import { useSwiftyperContext } from './swiftyper'
// eslint-disable-next-line
// @ts-ignore
import { Swiftyper } from 'swiftyper-node'
import SwiftyperService from '@/services/SwiftyperService'
import { SwiftyperServiceContext } from '@/contexts/SwiftyperServiceContext'

const client = new Swiftyper()

const swiftyperServiceInstance = new SwiftyperService(client)

type SwiftyperServiceProviderProps = {
    children: ReactElement
}

export const SwiftyperServiceProvider = (
    props: SwiftyperServiceProviderProps
) => {
    const swiftyper = useSwiftyperContext()

    useEffect(() => {
        const { token, locale, contributor } = swiftyper!

        client._setApiKey(token)
        swiftyperServiceInstance.contributor = contributor
        swiftyperServiceInstance.locale = locale
    }, [swiftyper])

    return (
        <SwiftyperServiceContext.Provider
            value={swiftyperServiceInstance}
            {...props}
        />
    )
}
