import styles from './AgeBadge.module.scss'

interface AgeBageProps {
    value: string,
    className?: string
}

const AgeBadge = ({ value, className }: AgeBageProps) => {
    return (
        <div className={[styles.badge, className].join(' ')}>
            {value}+
        </div>
    )
}

export default AgeBadge;