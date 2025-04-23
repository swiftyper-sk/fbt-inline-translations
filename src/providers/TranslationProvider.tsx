import React, { ReactNode, useState } from 'react'
import { TranslationContext } from '@/contexts/TranslationContext'
import { Translation } from '@/types/Translation'

type TranslationProviderProps = {
    children: ReactNode
}

export const TranslationProvider = (props: TranslationProviderProps) => {
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
