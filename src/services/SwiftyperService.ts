import { Phrase } from '../@types/Phrase'
// eslint-disable-next-line
// @ts-ignore
import { Swiftyper } from 'swiftyper-node'

export default class SwiftyperService {
    client!: Swiftyper
    contributor: null | string = null
    locale: null | string = null

    constructor(client: Swiftyper) {
        this.client = client
    }

    get(hash: string) {
        const { locale, contributor } = this

        return this.client.translations.query({
            hash,
            locale,
            contributor,
        })
    }

    vote(id: number) {
        const { contributor } = this

        return this.client.translations.vote({
            trid: id,
            contributor,
        })
    }

    translate(translation: string, hash: string, phrase: Phrase) {
        const { locale, contributor } = this
        const { hash: phash } = phrase

        return this.client.translations.translate({
            translation,
            hash,
            phash,
            locale,
            contributor,
        })
    }
}
