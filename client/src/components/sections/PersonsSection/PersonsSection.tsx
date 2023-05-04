import Slider from '@/components/Slider/Slider';
import ActorList from '@/components/actor/ActorList/ActorList';
import IActor from '@/models/IActor';
import styles from './PersonsSection.module.scss';
import UnderlinedLink from '@/components/UI/links/UnderlinedLink/UnderlinedLink';
import LinkUI from '@/components/UI/links/Link/LinkUI';
import { useRouter } from 'next/router';

interface PersonsSectionProps {
    persons: IActor[];
    size: 'large' | 'small';
}

const PersonsSection = ({ persons, size }: PersonsSectionProps) => {
    const { asPath } = useRouter();

    /* const onClick = (e: any) => {
        e.preventDefault();
    };*/

    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                {size === 'large' ? (
                    <h3>Персоны</h3>
                ) : (
                    <UnderlinedLink text="Актёры и создатели" href={`${asPath}?more`} />
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
                        <LinkUI className={styles.section__list_link} href={`${asPath}?more`} shape="round">
                            Ещё
                        </LinkUI>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonsSection;
