import { Translation } from '../@types/Translation'
import { HiCheckCircle, HiOutlineCheckCircle } from 'react-icons/hi'
import React from 'react'

type Props = {
    candidate: Translation
    onClick: (translation: string) => void
    onVote: (id: number) => void
}

export default function Candidate({ candidate, onClick, onVote }: Props) {
    const { translation } = candidate

    return (
        <div className="tw-flex tw-gap-2 hover:tw-cursor-pointer tw-py-2 tw-text-md tw-items-center tw-relative tw-border-0">
            {candidate.voted ? (
                <HiCheckCircle
                    className="tw-text-xl tw-text-blue-600"
                    onClick={() => onVote(candidate.id)}
                />
            ) : (
                <HiOutlineCheckCircle
                    className="tw-text-xl tw-text-gray-500"
                    onClick={() => onVote(candidate.id)}
                />
            )}
            <span title="Copy" onClick={() => onClick(translation)}>
                {translation}
            </span>
        </div>
    )
}
