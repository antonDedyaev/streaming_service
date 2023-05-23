import styles from './PriceBadge.module.scss';
import { useTranslation } from 'next-i18next';

interface PriceBageProps {
    priceType: 'free' | 'subscription' | 'purchase';
}

const PriceBadge = ({ priceType }: PriceBageProps) => {
    const { t } = useTranslation('common');
    return (
        <div className={[styles.badge, styles[priceType]].join(' ')}>
            {(priceType === 'free' && t('free')) ||
                (priceType === 'subscription' && t('subscription')) ||
                (priceType === 'purchase' && t('purchase'))}
        </div>
    );
};

export default PriceBadge;
