import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { SwiftyperProvider } from './providers/swiftyper'
import { SwiftyperServiceProvider } from './contexts/SwiftyperServiceContext'

type FbtInlineTranslationsProps = {
    token: string
    locale: string
    contributor: string
    darkMode?: boolean
    children?: React.ReactNode | undefined
}

export const FbtInlineTranslationsWrapper = (
    {children, ...props}: FbtInlineTranslationsProps
) => {
    return (
        <SwiftyperProvider {...props}>
            <SwiftyperServiceProvider>
                <App>{children}</App>
            </SwiftyperServiceProvider>
        </SwiftyperProvider>
    )
}

const swiftyperInlineTranslations = (props: FbtInlineTranslationsProps) => {
    if (props.darkMode) {
        document.documentElement.classList.add('tw-dark')
    }

    ReactDOM.render(
        <FbtInlineTranslationsWrapper {...props} />,
        document.getElementById('inline-translator')
    )
}

// eslint-disable-next-line
// @ts-ignore
window.swiftyperInlineTranslations = swiftyperInlineTranslations

export default swiftyperInlineTranslations
