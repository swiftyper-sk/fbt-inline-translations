/* ===============================
 * Rodal v2.0.0 https://github.com/chenjiahan/rodal
 * =============================== */

import React, { ReactElement } from 'react'
import cx from 'classnames'

// env
const IN_BROWSER = typeof window !== 'undefined'
const UA = IN_BROWSER && window.navigator.userAgent.toLowerCase()
const IS_IE_9 = UA && UA.indexOf('msie 9.0') > 0

type Props = DialogProps & {
    animationType: string
    enterAnimation: string
    leaveAnimation: string
    animation: string
}

const Dialog = (props: Props) => {
    const animation =
        (props.animationType === 'enter'
            ? props.enterAnimation
            : props.leaveAnimation) || props.animation

    const className = `rodal-dialog rodal-${animation}-${props.animationType}`

    const CloseButton = props.showCloseButton ? (
        <span
            className="rodal-close"
            onClick={props.onClose}
            onKeyPress={(event) => {
                if (props.onClose && event.which === 13) {
                    props.onClose(event)
                }
            }}
            tabIndex={0}
        />
    ) : null

    const {
        width = 400,
        height = 240,
        measure = 'px',
        duration,
        customStyles,
        id,
    } = props

    const style = {
        width: width + measure,
        height: height + measure,
        animationDuration: duration + 'ms',
        WebkitAnimationDuration: duration + 'ms',
    }

    const mergedStyles = { ...style, ...customStyles }

    return (
        <div style={mergedStyles} className={className} id={id}>
            {props.children}
            {CloseButton}
        </div>
    )
}

type DialogProps = {
    children: ReactElement
    width?: number
    height?: number
    measure?: string
    visible: boolean
    showMask: boolean
    closeOnEsc: boolean
    closeMaskOnClick: boolean
    showCloseButton: boolean
    animation: string
    enterAnimation: string
    leaveAnimation: string
    duration: number
    className: string
    customStyles: object
    customMaskStyles: object
    onClose: (
        e: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
    ) => void
    onAnimationEnd?: () => void
    id?: string
}

type State = {
    isShow: boolean
    animationType: string
}

class Rodal extends React.Component<DialogProps, State> {
    static defaultProps = {
        visible: false,
        showMask: true,
        closeOnEsc: false,
        closeMaskOnClick: true,
        showCloseButton: true,
        animation: 'zoom',
        enterAnimation: '',
        leaveAnimation: '',
        duration: 300,
        className: '',
        customStyles: {},
        customMaskStyles: {},
    }

    state = {
        isShow: false,
        animationType: 'leave',
    }

    el: HTMLElement | null = null

    componentDidMount() {
        if (this.props.visible) {
            this.enter()
        }
    }

    componentDidUpdate(prevProps: { visible: any }) {
        if (this.props.visible && !prevProps.visible) {
            this.enter()
        }

        if (!this.props.visible && prevProps.visible) {
            this.leave()
        }
    }

    enter() {
        this.setState({ isShow: true, animationType: 'enter' })
    }

    leave() {
        if (IS_IE_9) {
            this.setState({ isShow: false })
        } else {
            this.setState({ animationType: 'leave' })
        }
    }

    onKeyUp = (event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (!this.props.closeOnEsc || event.keyCode !== 27) {
            return
        }

        this.props.onClose(event)
    }

    animationEnd: any = (event: Event): void => {
        const { animationType } = this.state
        const { closeOnEsc, onAnimationEnd } = this.props

        if (animationType === 'leave') {
            this.setState({ isShow: false })
        } else if (closeOnEsc) {
            this.el?.focus()
        }

        if (event.target === this.el && onAnimationEnd) {
            onAnimationEnd()
        }
    }

    render() {
        const {
            closeMaskOnClick,
            onClose,
            customMaskStyles,
            showMask,
            duration,
            className,
            children,
        } = this.props

        const { isShow, animationType } = this.state

        const Mask = showMask ? (
            <div
                className="rodal-mask"
                style={customMaskStyles}
                onClick={closeMaskOnClick ? onClose : void 0}
            />
        ) : null

        const style = {
            display: isShow ? '' : 'none',
            animationDuration: duration + 'ms',
            WebkitAnimationDuration: duration + 'ms',
        }

        return (
            <div
                style={style}
                className={cx(
                    'rodal',
                    `rodal-fade-${animationType}`,
                    className
                )}
                onAnimationEnd={this.animationEnd}
                tabIndex={-1}
                ref={(el) => {
                    this.el = el
                }}
                onKeyUp={this.onKeyUp}
            >
                {Mask}
                <Dialog {...this.props} animationType={animationType}>
                    {children}
                </Dialog>
            </div>
        )
    }
}

export default Rodal
