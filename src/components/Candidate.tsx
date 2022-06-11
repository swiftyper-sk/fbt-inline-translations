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
        <div className="translation flex gap-2 hover:cursor-pointer py-2 text-md items-center relative border-0">
            {candidate.voted ? (
                <HiCheckCircle
                    className="text-xl text-blue-600"
                    onClick={() => onVote(candidate.id)}
                />
            ) : (
                <HiOutlineCheckCircle
                    className="text-xl text-gray-500"
                    onClick={() => onVote(candidate.id)}
                />
            )}
            <span title="Copy" onClick={() => onClick(translation)}>
                {translation}
            </span>
        </div>
    )
}
