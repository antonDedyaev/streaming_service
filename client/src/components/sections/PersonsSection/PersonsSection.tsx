import Slider from '@/components/Slider/Slider';
import ActorList from '@/components/actor/ActorList/ActorList';
import IActor from '@/models/IActor';
import styles from './PersonsSection.module.scss';

interface PersonsSectionProps {
    persons: IActor[],
    size: 'large' | 'small'
}

const PersonsSection = ({ persons, size }: PersonsSectionProps) => {
    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                { size === 'large' ? <h3>Персоны</h3> : <h3>Актёры и создатели</h3> }
            </div>

            <div className={styles.section__content}>
                {size === 'large' ? (
                    <Slider itemType='actor' length={persons.length}>
                        <ActorList actors={persons} size={size} />
                    </Slider>
                ) : (
                    <ActorList actors={persons.slice(0,10)} size={size} />
                )}
            </div>
        </div>
    )
}

export default PersonsSection;