import React from 'react'
// eslint-disable-next-line
// @ts-ignore
import Rodal from 'rodal'
import { Translation } from './@types/Translation'
import TranslationCard from './components/TranslationCard'
import 'rodal/lib/rodal.css'
import 'typeface-roboto'
import './App.css'

// eslint-disable-next-line
type Props = {}

type State = {
    visible: boolean
    translation: Translation | null
    hash: string | null
    locale: string | null
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            visible: false,
            translation: null,
            hash: null,
            locale: null,
        }

        this.hide = this.hide.bind(this)
    }

    componentDidMount() {
        document.addEventListener(
            'click',
            this.openTranslationDialog.bind(this)
        )
    }

    openTranslationDialog(event: MouseEvent) {
        const target = event.target as HTMLElement

        if (
            target.classList.contains('intlInlineMode_normal') ||
            target.classList.contains('intlInlineMode_translatable') ||
            target.classList.contains('intlInlineMode_approvable') ||
            target.classList.contains('intlInlineMode_reportable')
        ) {
            const hash = target.getAttribute('data-intl-hash')
            const locale = target.getAttribute('data-intl-locale')

            this.setState({
                visible: true,
                hash,
                locale,
            })
        }
    }

    hide() {
        this.setState({ visible: false })
    }

    render() {
        const { hash } = this.state

        return (
            <Rodal
                customStyles={{ height: 'auto', bottom: 'auto', top: 'auto' }}
                className="tw-flex tw-items-center tw-overflow-auto"
                enterAnimation=" rodal-zoom-enter dark:tw-bg-gray-800 " // ugly hack
                leaveAnimation=" rodal-fade-leave dark:tw-bg-gray-800 " // ugly hack
                visible={this.state.visible}
                onClose={this.hide}
            >
                <TranslationCard hash={hash} hide={this.hide} />
            </Rodal>
        )
    }
}

export default App
