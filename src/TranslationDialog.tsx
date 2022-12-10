import React from 'react'
// eslint-disable-next-line
// @ts-ignore
import Rodal from 'rodal'
import { Translation } from './@types/Translation'
import TranslationCard from './components/TranslationCard'
import 'rodal/lib/rodal.css'
import 'typeface-roboto'
import './App.css'

type Props = {}

type State = {
    visible: boolean
    translation: Translation | null
    hash: string | null
    locale: string | null
}

class TranslationDialog extends React.Component<Props, State> {
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
            'contextmenu',
            this.openTranslationDialog.bind(this)
        )
    }

    openTranslationDialog(event: MouseEvent) {
        let parent: HTMLElement | null = event.target as HTMLElement

        while (parent) {
            if (
                parent.classList.contains('intlInlineMode_normal') ||
                parent.classList.contains('intlInlineMode_translatable') ||
                parent.classList.contains('intlInlineMode_approvable') ||
                parent.classList.contains('intlInlineMode_reportable')
            ) {
                const hash = parent.getAttribute('data-intl-hash')
                const locale = parent.getAttribute('data-intl-locale')

                this.setState({
                    visible: true,
                    hash,
                    locale,
                })

                event.preventDefault()

                return
            }

            parent = parent.parentElement
        }
    }

    hide() {
        this.setState({ visible: false })
    }

    render() {
        const { hash } = this.state
        const { children } = this.props

        return (
            <>
                {children}
                <Rodal
                    customStyles={{
                        height: 'auto',
                        bottom: 'auto',
                        top: 'auto',
                    }}
                    className="tw-flex tw-items-center tw-overflow-auto"
                    enterAnimation=" rodal-zoom-enter dark:tw-bg-gray-800 " // ugly hack
                    leaveAnimation=" rodal-fade-leave dark:tw-bg-gray-800 " // ugly hack
                    visible={this.state.visible}
                    onClose={this.hide}
                >
                    <TranslationCard
                        key={hash}
                        hash={hash}
                        visible={this.state.visible}
                        hide={this.hide}
                    />
                </Rodal>
            </>
        )
    }
}

export default TranslationDialog
