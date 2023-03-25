import React, { useContext, useState } from 'react'
import { Phrase } from '../types/Phrase'

type PhraseContextType = {
    phrase: Phrase
    setPhrase: React.Dispatch<React.SetStateAction<Phrase>>
}

const PhraseContext = React.createContext<PhraseContextType | undefined>(
    undefined
)

export const usePhraseContext = () => useContext(PhraseContext)

type Props = {
    phrase: Phrase
    children: JSX.Element[]
}

export const PhraseProvider = (props: Props) => {
    const [phrase, setPhrase] = useState<Phrase>(props.phrase)

    const value = {
        phrase,
        setPhrase,
    }

    return <PhraseContext.Provider value={value} {...props} />
}
