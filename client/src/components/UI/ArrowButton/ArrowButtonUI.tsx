import Image from 'next/image'
import arrowLeftIcon from '../../../../public/icons/arrows/arrow_left.svg'
import arrowRightIcon from '../../../../public/icons/arrows/arrow_right.svg'
import styles from './ArrowButtonUI.module.scss'

interface ArrowButtonProps {
    className: string
    diarection: 'top' | 'right' | 'bottom' | 'left'
    iconSize: 'large' | 'medium' | 'small'
    onClick?: () => void
}

function ArrowButton({ className, diarection, iconSize, onClick }: ArrowButtonProps) {
    let arrowIcon

    switch(diarection) {
        case 'right': 
            arrowIcon = arrowRightIcon
            break
        case 'left':
            arrowIcon = arrowLeftIcon
            break
    }

    switch(iconSize) {
        case 'large':
            arrowIcon.width = 30
            break

        case 'medium':
            arrowIcon.width = 20
            break

        case 'small':
            arrowIcon.width = 10
            break
    }

    const clickHandler = () => {
        if (!onClick) return

        onClick()
    }

    return (
        <button 
            className={[styles.button, className].join(' ')}
            onClick={clickHandler}>
            <Image 
                className={[styles.icon, 'icon'].join(' ')}
                src={arrowIcon} 
                alt=""
            />
        </button>
    )
}

export default ArrowButton