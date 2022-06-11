import React from 'react'
import { HiExclamation } from 'react-icons/hi'
import classNames from 'classnames'

type Props = {
    hash: string
    translation: string | undefined
    language: string
    error: string | null
    loading: boolean
    hide: () => void
    setTranslation: (translation: string) => void
    onSubmit: (translation: string, hash: string) => void
}

export default function Composer({
    hash,
    translation,
    language,
    error,
    loading,
    hide,
    setTranslation,
    onSubmit,
}: Props) {
    return (
        <div>
            <textarea
                placeholder={`Type your translation in ` + language}
                value={translation}
                className={classNames(
                    'max-w-lg mt-3 mb-1 p-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-900 resize-y outline-none box-border shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md',
                    {
                        '!border-red-500': error,
                    }
                )}
                onInput={(event) => setTranslation(event.currentTarget.value)}
                disabled={loading}
            />
            {error && (
                <div className="flex gap-1.5 items-center text-xs text-red-600 error-message">
                    <HiExclamation /> {error}
                </div>
            )}
            <div>
                <div className="float-right mt-2">
                    <button
                        type="button"
                        className="hover:cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-dark bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={hide}
                    >
                        Close
                    </button>
                    <button
                        className="ml-3 hover:cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={loading}
                        onClick={() => onSubmit(translation!, hash)}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
