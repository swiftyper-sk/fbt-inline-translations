import React, { ReactNode, useState } from 'react'
import { Phrase } from '@/types/Phrase'
import { PhraseContext } from '@/contexts/PhraseContext'

type PhraseProviderProps = {
    phrase: Phrase
    children: ReactNode
}

export const PhraseProvider = (props: PhraseProviderProps) => {
    const [phrase, setPhrase] = useState<Phrase>(props.phrase)

    const value = {
        phrase,
        setPhrase,
    }

    return <PhraseContext.Provider value={value} {...props} />
}
