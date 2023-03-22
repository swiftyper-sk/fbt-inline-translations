import React from 'react'
import { HiExclamation } from 'react-icons/hi'
import classNames from 'classnames'
import { usePhraseContext } from '../contexts/PhraseContext'
import { Term } from '../@types/Phrase'
import { useTranslationContext } from '../contexts/TranslationContext'
import { useSwiftyperServiceContext } from '../contexts/SwiftyperServiceContext'

type Props = {
    hide: () => void
}

export default function Composer({ hide }: Props) {
    const swiftyperService = useSwiftyperServiceContext()!
    const {
        currentTranslation,
        setCurrentTranslation,
        composerError,
        composerLoading,
        setComposerLoading,
        setComposerError,
        setRefetch,
    } = useTranslationContext()!
    const { phrase } = usePhraseContext()!
    const { glossary, hash } = phrase
    const language = phrase.locale.name

    const handleSubmit = () => {
        setComposerLoading(true)
        setComposerError(null)

        swiftyperService
            .translate(currentTranslation, hash, phrase!)
            .then(() => {
                setRefetch(true)
                setCurrentTranslation('')
            })
            .catch(({ message }: Error) => {
                setComposerError(message)
            })
            .finally(() => setComposerLoading(false))
    }

    return (
        <div>
            <textarea
                placeholder={`Type your translation in ` + language}
                value={currentTranslation}
                className={classNames(
                    'tw-max-w-lg tw-mt-3 tw-mb-1 tw-p-3 dark:tw-bg-gray-900 dark:tw-text-gray-300 dark:tw-border-gray-900 tw-resize-y tw-outline-none tw-box-border tw-shadow-sm tw-block tw-w-full focus:!tw-ring-blue-500 focus:!tw-border-blue-500 sm:tw-text-sm tw-border tw-border-gray-300 tw-rounded-md',
                    {
                        '!tw-border-red-500': composerError,
                    }
                )}
                onInput={(event) =>
                    setCurrentTranslation(event.currentTarget.value)
                }
                disabled={composerLoading}
                autoFocus={true}
            />
            {composerError && (
                <div className="tw-flex tw-gap-1.5 tw-items-center tw-text-xs tw-text-red-600">
                    <HiExclamation /> {composerError}
                </div>
            )}
            {glossary.length > 0 && (
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
                        disabled={composerLoading}
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
