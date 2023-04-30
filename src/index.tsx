import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import TranslationDialog from './TranslationDialog'
import { SwiftyperProvider } from './providers/swiftyper'
import { SwiftyperServiceProvider } from './contexts/SwiftyperServiceContext'

type FbtInlineTranslationsProps = {
    token: string
    locale: string
    contributor: string
    darkMode?: boolean
    children?: ReactElement | undefined
}

export const FbtInlineTranslationsWrapper = ({
    children,
    ...props
}: FbtInlineTranslationsProps) => {
    return (
        <SwiftyperProvider {...props}>
            <SwiftyperServiceProvider>
                <TranslationDialog>{children}</TranslationDialog>
            </SwiftyperServiceProvider>
        </SwiftyperProvider>
    )
}

const swiftyperInlineTranslations = (props: FbtInlineTranslationsProps) => {
    const elementId = `inline-translator`
    const container = document.getElementById(elementId)

    if (!container) {
        console.error(
            `[fbt-inline-translations] No wrapper element found! Make sure you have a wrapper element with id \`${elementId}\`.`
        )

        return
    }

    if (props.darkMode) {
        document.documentElement.classList.add('tw-dark')
    }

    ReactDOM.render(<FbtInlineTranslationsWrapper {...props} />, container)
}

export default swiftyperInlineTranslations
