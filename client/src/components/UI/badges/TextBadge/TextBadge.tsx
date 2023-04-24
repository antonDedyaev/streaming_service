import style from './TextBadge.module.scss'

interface TextBadgeProps {
    text: string
}

const TextBadge = ({text}: TextBadgeProps) => {
    return (
        <div className={style.badge}>
            {text}
        </div>
    )
}

export default TextBadge;