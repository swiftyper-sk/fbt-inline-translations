import React, { useContext } from 'react'
import { Translation } from '@/types/Translation'

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

export const TranslationContext = React.createContext<
    TranslationContextType | undefined
>(undefined)

export const useTranslationContext = () => useContext(TranslationContext)
