import React, { useEffect, useState } from 'react'
import PhraseOverview from './PhraseOverview'
import Candidate from './Candidate'
import Composer from './Composer'
import { useSwiftyperServiceContext } from '../contexts/SwiftyperServiceContext'
import { Phrase } from '../@types/Phrase'
import { HiExclamation } from 'react-icons/hi'
import { PhraseProvider } from '../contexts/PhraseContext'
import { useTranslationContext } from '../contexts/TranslationContext'

type Props = {
    hash: string | null
    visible: boolean
    hide: () => void
}

export default function TranslationCard({ hash, hide, visible }: Props) {
    const swiftyperService = useSwiftyperServiceContext()!
    const { setCurrentTranslation, setRefetch, refetch } =
        useTranslationContext()!
    const [phrase, setPhrase] = useState<Phrase>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        return () => {
            if (!visible) {
                setRefetch(null)
                setLoading(true)
                setCurrentTranslation('')
            }
        }
    }, [visible])

    useEffect(() => {
        if (hash && refetch !== false) {
            setRefetch(false)
            setLoading(true)
            setError(null)

            swiftyperService
                .get(hash)
                .then(setPhrase)
                .catch(({ message }: Error) => setError(message))
                .finally(() => setLoading(false))
        }
    }, [hash, refetch])

    if (error) {
        return (
            <>
                <div className="tw-mx-auto tw-flex tw-items-center tw-justify-center tw-h-12 tw-w-12 tw-rounded-full tw-bg-red-100">
                    <HiExclamation className="tw-h-6 tw-w-6 tw-text-red-600" />
                </div>
                <div className="tw-mt-3 tw-text-center sm:tw-mt-5">
                    <h3 className="tw-mb-0 tw-text-lg tw-leading-6 tw-font-medium tw-text-gray-900 dark:tw-text-white">
                        {error || 'Invalid request'}
                    </h3>
                </div>
            </>
        )
    }

    if (loading && !phrase) {
        return (
            <>
                <div className="tw-mx-auto tw-flex tw-items-center tw-justify-center tw-h-12 tw-w-12 loader" />
                <div className="tw-mt-3 tw-text-center sm:tw-mt-5">
                    <h3 className="tw-mb-0 tw-text-lg tw-leading-6 tw-font-medium tw-text-gray-900 dark:tw-text-white">
                        Loading...
                    </h3>
                </div>
            </>
        )
    }
    return (
        <PhraseProvider phrase={phrase!}>
            <PhraseOverview />
            <div className="tw-m-0 tw-p-0 tw-divide-y tw-divide-solid tw-divide-gray-300 dark:tw-divide-gray-700 dark:tw-text-white">
                {phrase!.translations.map((candidate, index) => (
                    <Candidate
                        candidate={candidate}
                        key={`candidate-` + index}
                    />
                ))}
            </div>
            <Composer hide={hide} />
        </PhraseProvider>
    )
}
