import Slider from '@/components/Slider/Slider';
import ActorList from '@/components/actor/ActorList/ActorList';
import IActor from '@/models/IActor';
import styles from './PersonsSection.module.scss';
import UnderlinedLink from '@/components/UI/links/UnderlinedLink/UnderlinedLink';
import { UseTranslation, useTranslation } from 'next-i18next';

interface PersonsSectionProps {
    persons: IActor[];
    size: 'large' | 'small';
}

const PersonsSection = ({ persons, size }: PersonsSectionProps) => {
    const { t } = useTranslation('moviesPage');
    const onClick = (e: any) => {
        e.preventDefault();
    };

    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                {size === 'large' ? (
                    <h3>{t('celebrities')}</h3>
                ) : (
                    <UnderlinedLink text="Актёры и создатели" onClick={onClick} />
                )}
            </div>

            <div className={styles.section__content}>
                {size === 'large' ? (
                    <Slider itemType="actor" length={persons.length}>
                        <ActorList actors={persons} size={size} />
                    </Slider>
                ) : (
                    <div className={styles.section__list}>
                        <ActorList actors={persons.slice(0, 10)} size={size} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonsSection;
