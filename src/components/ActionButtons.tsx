import React from 'react'
import { useSwiftyperServiceContext } from '../contexts/SwiftyperServiceContext'
import { useTranslationContext } from '../contexts/TranslationContext'
import { usePhraseContext } from '../contexts/PhraseContext'
import classNames from 'classnames'

type ButtonProps = {
    children: string
    className: string
    onClick: () => void
    disabled?: boolean
}

const Button = ({ children, className, ...rest }: ButtonProps) => {
    return (
        <button
            type="button"
            className={classNames(
                'hover:tw-cursor-pointer tw-inline-flex tw-justify-center tw-py-2 tw-px-4 tw-border tw-border-transparent tw-shadow-sm tw-text-sm tw-font-medium tw-rounded-md focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-blue-500',
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}

type Props = {
    hide: () => void
}

export default function ActionButtons({ hide }: Props) {
    const swiftyperService = useSwiftyperServiceContext()!
    const {
        currentTranslation,
        setCurrentTranslation,
        composerLoading,
        setComposerLoading,
        setComposerError,
        setRefetch,
    } = useTranslationContext()!
    const { phrase } = usePhraseContext()!
    const { hash } = phrase

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
            <div className="tw-flex tw-justify-end tw-pt-2 tw-mt-2 tw-gap-2 tw-border tw-border-solid tw-border-b-0 tw-border-x-0 tw-border-gray-300 dark:tw-border-gray-700">
                <Button
                    className="tw-text-dark tw-bg-transparent dark:tw-text-white focus:tw-outline-none"
                    onClick={hide}
                >
                    Close
                </Button>
                <Button
                    className="tw-text-white tw-bg-blue-600 hover:tw-bg-blue-700"
                    disabled={composerLoading}
                    onClick={() => handleSubmit()}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}
