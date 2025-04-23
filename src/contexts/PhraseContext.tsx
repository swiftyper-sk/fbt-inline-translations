import React, { useContext } from 'react'
import { Phrase } from '@/types/Phrase'

type PhraseContextType = {
    phrase: Phrase
    setPhrase: React.Dispatch<React.SetStateAction<Phrase>>
}

export const PhraseContext = React.createContext<PhraseContextType | undefined>(
    undefined
)

export const usePhraseContext = () => useContext(PhraseContext)
