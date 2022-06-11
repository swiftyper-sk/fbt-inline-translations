export type Translation = {
    id: number
    voted: boolean
    phrase_id: number
    object: string
    phrase_hash: string
    hash: string
    translation: string
    approval_status: string
    variations: []
    tokens: []
    types: []
    locale: string
    author: string
    created_at: string
}
