import styles from './AgeBadge.module.scss'

interface AgeBageProps {
    value: string
}

const AgeBadge = ({value}: AgeBageProps) => {
    return (
        <div className={styles.badge}>
            {value}+
        </div>
    )
}

export default AgeBadge;