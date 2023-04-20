import style from './TextBadge.module.scss'

interface TextBadgeProps {
    text: string
}

function TextBadge({text}: TextBadgeProps) {
    return (
        <div className={style.textBadge}>
            {text}
        </div>
    )
}

export default TextBadge;