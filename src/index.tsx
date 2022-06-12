import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { SwiftyperProvider } from './providers/swiftyper'
import { SwiftyperServiceProvider } from './contexts/SwiftyperServiceContext'

type AppProps = {
    token: string
    locale: string
    contributor: string
    darkMode: boolean
}

const swiftyperInlineTranslations = (props: AppProps) => {
    if (props.darkMode) {
        document.documentElement.classList.add('tw-dark')
    }

    ReactDOM.render(
        <SwiftyperProvider {...props}>
            <SwiftyperServiceProvider>
                <App />
            </SwiftyperServiceProvider>
        </SwiftyperProvider>,
        document.getElementById('inline-translator')
    )
}

module.hot!.accept()

// eslint-disable-next-line
// @ts-ignore
window.swiftyperInlineTranslations = swiftyperInlineTranslations

export default swiftyperInlineTranslations
