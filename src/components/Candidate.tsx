import { Translation } from '@/types/Translation'
import { HiCheckCircle, HiOutlineCheckCircle } from 'react-icons/hi'
import React from 'react'
import { useTranslationContext } from '@/contexts/TranslationContext'
import { useSwiftyperServiceContext } from '@/contexts/SwiftyperServiceContext'

type CandidateProps = {
    candidate: Translation
}

const Candidate: React.FC<CandidateProps> = ({ candidate }) => {
    const swiftyperService = useSwiftyperServiceContext()!
    const {
        setCurrentTranslation,
        setComposerLoading,
        setComposerError,
        setRefetch,
    } = useTranslationContext()!

    const { translation } = candidate

    const handleVote = () => {
        setComposerLoading(true)
        setComposerError(null)

        swiftyperService
            .vote(candidate.id)
            .then(() => setRefetch(true))
            .catch(({ message }: Error) => setComposerError(message))
            .finally(() => setComposerLoading(false))
    }

    return (
        <div className="tw-flex tw-gap-2 hover:tw-cursor-pointer tw-py-2 tw-text-md tw-items-center tw-relative tw-border-0 tw-break-words">
            {candidate.voted ? (
                <HiCheckCircle
                    className="tw-text-xl tw-text-blue-600 tw-min-w-[20px]"
                    onClick={handleVote}
                />
            ) : (
                <HiOutlineCheckCircle
                    className="tw-text-xl tw-text-gray-500 tw-min-w-[20px]"
                    onClick={handleVote}
                />
            )}
            <span
                title="Copy"
                onClick={() => setCurrentTranslation(translation)}
            >
                {translation}
            </span>
        </div>
    )
}

export default Candidate
