import { Translation } from './Translation'

export type TableJSFBTTreeLeaf = {
    desc: string
    hash?: string
    text: string
    tokenAliases?: string
    outerTokenName?: string
}

export type TableJSFBTTreeBranch = {
    [key: number]: TableJSFBTTree
}

export type TableJSFBTTree = TableJSFBTTreeLeaf | TableJSFBTTreeBranch

export type JSFBTMetaEntry =
    | {
          type: string
          singular?: boolean
          token?: string
      }
    | {
          type: string
          token: string
      }
    | {
          type: string
      }
    | {
          range: string[]
      }

export type TableJSFBT = {
    t: TableJSFBTTree
    m: JSFBTMetaEntry[]
}

export type Phrase = {
    id: number
    parent_id: number | null
    object: string
    source: {
        desc: string
        type: string
        jsfbt: string | TableJSFBT
    }
    hash: string
    text: string
    description: string
    author: string
    project: string
    created_at: string
    translations: Translation[]
    locale: {
        name: string
    }
}
