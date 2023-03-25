import React from 'react'
import { Term } from '../types/Phrase'

type Props = {
    glossary: Term[]
}

export default function Glossary({ glossary }: Props) {
    return (
        <div>
            <h4 className="tw-text-gray-800 dark:tw-text-gray-500 tw-mt-4 tw-mb-2">
                Glossary:
            </h4>
            <ul className="tw-list-none tw-list-inside tw-m-0 tw-p-0">
                {glossary.map((term: Term) => (
                    <li
                        key={term.hash}
                        className="tw-mb-1 tw-text-gray-900 dark:tw-text-gray-400"
                    >
                        <strong>{term.text} : </strong>
                        <span
                            title={term.description}
                            className="tw-text-blue-500 hover:tw-cursor-help"
                        >
                            {term.translation.translation}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
