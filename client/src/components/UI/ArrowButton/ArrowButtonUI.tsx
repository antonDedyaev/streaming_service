import Image from 'next/image'
import arrowLeftGrayIcon from '../../../../public/icons/arrows/arrow_left_gray.svg'
import arrowLeftWhiteIcon from '../../../../public/icons/arrows/arrow_left_white.svg'
import arrowRightGrayIcon from '../../../../public/icons/arrows/arrow_right_gray.svg'
import arrowRightWhiteIcon from '../../../../public/icons/arrows/arrow_right_white.svg'
import styles from './ArrowButtonUI.module.scss'
import { useState } from 'react'

interface ArrowButtonProps {
    className: string
    diarection: 'top' | 'right' | 'bottom' | 'left'
    iconSize: 'large' | 'medium' | 'small'
    onClick?: () => void
}

function ArrowButton({ className, diarection, iconSize, onClick }: ArrowButtonProps) {
    const [hoverButton, setHoverButton] = useState<boolean>(false)

    let arrowIcon
    let arrowHoverIcon

    switch(diarection) {
        case 'right': 
            arrowIcon = arrowRightGrayIcon
            arrowHoverIcon = arrowRightWhiteIcon
            break
        case 'left':
            arrowIcon = arrowLeftGrayIcon
            arrowHoverIcon = arrowLeftWhiteIcon
            break
    }

    switch(iconSize) {
        case 'large':
            arrowIcon.width = 30
            arrowHoverIcon.width = 30
            break

        case 'medium':
            arrowIcon.width = 20
            arrowHoverIcon.width = 20
            break

        case 'small':
            arrowIcon.width = 10
            arrowHoverIcon.width = 10
            break
    }

    const clickHandler = () => {
        if (!onClick) return

        onClick()
    }

    return (
        <button 
            className={[styles.button, className].join(' ')}
            onClick={clickHandler} 
            onMouseOver={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}>
            <Image 
                className={[styles.icon, 'icon'].join(' ')}
                src={hoverButton ? arrowHoverIcon : arrowIcon} 
                alt=""
            />
        </button>
    )
}

export default ArrowButton