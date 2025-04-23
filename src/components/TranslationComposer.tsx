import React from 'react'
import { HiExclamation } from 'react-icons/hi'
import classNames from 'classnames'
import { usePhraseContext } from '@/contexts/PhraseContext'
import { useTranslationContext } from '@/contexts/TranslationContext'

const TranslationComposer: React.FC = () => {
    const {
        currentTranslation,
        setCurrentTranslation,
        composerError,
        composerLoading,
    } = useTranslationContext()!

    const { phrase } = usePhraseContext()!
    const languageName = phrase.locale.name

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setCurrentTranslation(event.currentTarget.value)
    }

    return (
        <div>
            <textarea
                placeholder={`Type your translation in ${languageName}`}
                value={currentTranslation}
                className={classNames(
                    'tw-max-w-lg tw-mt-3 tw-mb-1 tw-p-3 dark:tw-bg-gray-900 dark:tw-text-gray-300 dark:tw-border-gray-900 tw-resize-y tw-outline-none tw-box-border tw-shadow-sm tw-block tw-w-full focus:!tw-ring-blue-500 focus:!tw-border-blue-500 sm:tw-text-sm tw-border tw-border-gray-300 tw-rounded-md',
                    {
                        '!tw-border-red-500': composerError,
                    }
                )}
                onInput={handleInput}
                disabled={composerLoading}
                autoFocus={true}
            />
            {composerError && (
                <div className="tw-flex tw-gap-1.5 tw-items-center tw-text-xs tw-text-red-600">
                    <HiExclamation /> {composerError}
                </div>
            )}
        </div>
    )
}

export default TranslationComposer
