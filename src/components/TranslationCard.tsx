import React, { useEffect, useState } from 'react'
import PhraseOverview from './PhraseOverview'
import Candidate from './Candidate'
import Composer from './Composer'
import { useSwiftyperService } from '../contexts/SwiftyperServiceContext'
import { Phrase } from '../@types/Phrase'
import { HiExclamation } from 'react-icons/hi'

type Props = {
    hash: string | null
    hide: () => void
}

export default function TranslationCard({ hash, hide }: Props) {
    const swiftyperService = useSwiftyperService()!
    const [phrase, setPhrase] = useState<Phrase>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [reload, setReload] = useState<boolean | null>(null)
    const [composerLoading, setComposerLoading] = useState<boolean>(false)
    const [composerError, setComposerError] = useState<string | null>(null)
    const [currentTranslation, setCurrentTranslation] = useState<
        string | undefined
    >()

    useEffect(() => {
        if (hash && reload !== false) {
            setReload(false)
            setLoading(true)
            setError(null)

            swiftyperService
                .get(hash)
                .then(setPhrase)
                .catch(({ message }: Error) => setError(message))
                .finally(() => setLoading(false))
        }
    }, [hash, reload])

    if (error) {
        return (
            <>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <HiExclamation className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                    <h3 className="mb-0 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        {error || 'Invalid request'}
                    </h3>
                </div>
            </>
        )
    }

    if (loading && !phrase) {
        return (
            <>
                <div className="mx-auto flex items-center justify-center h-12 w-12 loader" />
                <div className="mt-3 text-center sm:mt-5">
                    <h3 className="mb-0 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Loading...
                    </h3>
                </div>
            </>
        )
    }

    return (
        <>
            <PhraseOverview phrase={phrase!} />
            <div className="m-0 p-0 divide-y divide-solid divide-gray-300 dark:divide-gray-700 dark:text-white">
                {phrase!.translations.map((translation, index) => (
                    <Candidate
                        candidate={translation}
                        key={`candidate-` + index}
                        onClick={(translation: string) =>
                            setCurrentTranslation(translation)
                        }
                        onVote={(id: number) => {
                            setComposerLoading(true)
                            setComposerError(null)

                            swiftyperService
                                .vote(id)
                                .then(() => setReload(true))
                                .catch(({ message }: Error) =>
                                    setComposerError(message)
                                )
                                .finally(() => setComposerLoading(false))
                        }}
                    />
                ))}
            </div>
            <Composer
                hash={phrase!.hash}
                translation={currentTranslation}
                language={phrase!.locale.name}
                loading={composerLoading}
                error={composerError}
                hide={hide}
                setTranslation={setCurrentTranslation}
                onSubmit={(translation: string, hash: string) => {
                    setComposerLoading(true)
                    setComposerError(null)

                    swiftyperService
                        .translate(translation, hash, phrase!)
                        .then(() => {
                            setReload(true)
                            setCurrentTranslation('')
                        })
                        .catch(({ message }: Error) => {
                            setComposerError(message)
                        })
                        .finally(() => setComposerLoading(false))
                }}
            />
        </>
    )
}
