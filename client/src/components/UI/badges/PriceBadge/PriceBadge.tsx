import styles from './PriceBadge.module.scss'

interface PriceBageProps {
    priceType: 'free' | 'subscription' | 'purchase'
}

const PriceBadge = ({priceType}: PriceBageProps) => {
    return (
        <div className={[styles.badge, styles[priceType]].join(' ')}>
                {
                    priceType === 'free' && 'Бесплатно' ||
                    priceType === 'subscription' && 'Подписка' ||
                    priceType === 'purchase' && 'Покупка'
                }    
        </div>
    )
}

export default PriceBadge;