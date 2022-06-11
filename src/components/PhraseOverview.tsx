import React from 'react'
import { Phrase } from '../@types/Phrase'

type Props = {
    phrase: Phrase
}

export default function PhraseOverview({ phrase }: Props) {
    const { text, description } = phrase

    return (
        <div>
            <div className="text-md text-gray-900 dark:text-white">{text}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-3">
                {description}
            </div>
        </div>
    )
}
