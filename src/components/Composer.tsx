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
                    'tw-max-w-lg tw-mt-3 tw-mb-1 tw-p-3 dark:tw-bg-gray-900 dark:tw-text-gray-300 dark:tw-border-gray-900 tw-resize-y tw-outline-none tw-box-border tw-shadow-sm tw-block tw-w-full focus:tw-ring-blue-500 focus:tw-border-blue-500 sm:tw-text-sm tw-border tw-border-gray-300 tw-rounded-md',
                    {
                        '!tw-border-red-500': error,
                    }
                )}
                onInput={(event) => setTranslation(event.currentTarget.value)}
                disabled={loading}
            />
            {error && (
                <div className="tw-flex tw-gap-1.5 tw-items-center tw-text-xs tw-text-red-600">
                    <HiExclamation /> {error}
                </div>
            )}
            <div>
                <div className="tw-flex tw-justify-end tw-mt-2">
                    <button
                        type="button"
                        className="hover:tw-cursor-pointer tw-inline-flex tw-justify-center tw-py-2 tw-px-4 tw-border tw-border-transparent tw-shadow-sm tw-text-sm tw-font-medium tw-rounded-md tw-text-dark tw-bg-transparent dark:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-blue-500"
                        onClick={hide}
                    >
                        Close
                    </button>
                    <button
                        className="tw-ml-3 hover:tw-cursor-pointer tw-inline-flex tw-justify-center tw-py-2 tw-px-4 tw-border tw-border-transparent tw-shadow-sm tw-text-sm tw-font-medium tw-rounded-md tw-text-white tw-bg-blue-600 hover:tw-bg-blue-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-blue-500"
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
