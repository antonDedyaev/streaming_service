import Slider from '@/components/Slider/Slider';

import IPerson from '@/models/IPerson';
import styles from './PersonsSection.module.scss';
import UnderlinedLink from '@/components/UI/links/UnderlinedLink/UnderlinedLink';
import { useRouter } from 'next/router';
import ShapedLinkUI from '@/components/UI/links/ShapedLink/ShapedLinkUI';
import { useTranslation } from 'next-i18next';
import PersonList from '@/components/person/PersonList/PersonList';

interface PersonsSectionProps {
    persons: IPerson[];
    size: 'large' | 'small';
}

const PersonsSection = ({ persons, size }: PersonsSectionProps) => {
    const { asPath } = useRouter();
    const { t } = useTranslation(['moviesPage', 'movie']);

    const directors = persons.filter((persons) => persons.enProfession.includes('director'));
    directors.map((director) => {
        director.profession = ['режиссеры'];
        director.enProfession = ['director'];
    });

    const actors = persons.filter((persons) => persons.enProfession.includes('actor'));

    return (
        <div className={styles.section} data-testid={'personsSection'}>
            <div className={styles.section__header}>
                {size === 'large' ? (
                    <h3 className={styles.section__title}>{t('celebrities')}</h3>
                ) : (
                    <UnderlinedLink text={t('titlePersons', { ns: 'movie' })} href={`${asPath}?more`} />
                )}
            </div>

            <div className={styles.section__content}>
                {size === 'large' ? (
                    <Slider itemType="actor" length={persons.length}>
                        <PersonList persons={persons} size={size} />
                    </Slider>
                ) : (
                    <div className={styles.section__list}>
                        {directors.length > 0 && (
                            <PersonList persons={directors.slice(0, directors.length >= 2 ? 2 : 1)} size={size} />
                        )}
                        <PersonList
                            persons={actors.slice(0, directors.length > 0 ? (directors.length >= 2 ? 8 : 9) : 10)}
                            size={size}
                        />
                        <ShapedLinkUI className={styles.section__list_link} href={`${asPath}?more`} shape="round">
                            {t('more', { ns: 'movie' })}
                        </ShapedLinkUI>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonsSection;
