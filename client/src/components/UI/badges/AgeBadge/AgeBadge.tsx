import styles from './AgeBadge.module.scss'

interface AgeBageProps {
    value: string
}

function AgeBadge({value}: AgeBageProps) {
    return (
        <div className={styles.age_badge}>
            {value}+
        </div>
    )
}

export default AgeBadge;