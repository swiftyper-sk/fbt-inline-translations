import React, { useContext, useState } from 'react'
import { Translation } from '../@types/Translation'

type TranslationContextType = {
    translation: Translation | null
    setTranslation: React.Dispatch<React.SetStateAction<Translation | null>>
    currentTranslation: string
    setCurrentTranslation: React.Dispatch<React.SetStateAction<string>>
    composerError: string | null
    setComposerError: React.Dispatch<React.SetStateAction<string | null>>
    composerLoading: boolean
    setComposerLoading: React.Dispatch<React.SetStateAction<boolean>>
    refetch: boolean | null
    setRefetch: React.Dispatch<React.SetStateAction<boolean | null>>
}

const TranslationContext = React.createContext<
    TranslationContextType | undefined
>(undefined)

export const useTranslationContext = () => useContext(TranslationContext)

type Props = {
    children: JSX.Element
}

export const TranslationProvider = (props: Props) => {
    const [translation, setTranslation] = useState<Translation | null>(null)
    const [composerError, setComposerError] = useState<string | null>(null)
    const [composerLoading, setComposerLoading] = useState<boolean>(false)
    const [refetch, setRefetch] = useState<boolean | null>(null)
    const [currentTranslation, setCurrentTranslation] = useState<string>('')

    const value = {
        translation,
        setTranslation,
        currentTranslation,
        setCurrentTranslation,
        composerError,
        setComposerError,
        composerLoading,
        setComposerLoading,
        refetch,
        setRefetch,
    }

    return <TranslationContext.Provider value={value} {...props} />
}
