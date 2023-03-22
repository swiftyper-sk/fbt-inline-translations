import React from 'react'
import { usePhraseContext } from '../contexts/PhraseContext'

export default function PhraseOverview() {
    const { phrase } = usePhraseContext()!
    const { text, description } = phrase

    return (
        <div>
            <div className="tw-text-md tw-text-gray-900 dark:tw-text-white">
                {text}
            </div>
            <div className="tw-text-sm tw-text-gray-500 dark:tw-text-gray-400 tw-mt-1 tw-mb-3">
                {description}
            </div>
        </div>
    )
}
