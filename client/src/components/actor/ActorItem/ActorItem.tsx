import Link from 'next/link';
import styles from './ActorItem.module.scss';
import Image from 'next/image';
import IPerson from '../../../models/IPerson';
import { declineWord } from '../../../utils/functions';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface ActorItemProps {
    className?: string;
    person: IPerson;
    size: 'large' | 'medium' | 'small';
}

const ActorItem = ({ className, person, size }: ActorItemProps) => {
    const { t } = useTranslation('moviesPage');
    const { locale } = useRouter();
    return (
        <Link
            href={`/persons/${person.id}`}
            className={[styles.container, styles[`container_${size}`], className].join(' ')}
        >
            <div className={styles.container__imageContainer}>
                <div className={styles.container__imageWrapper}>
                    {person.photo && (
                        <Image
                            className={styles.container__image}
                            src={person.photo}
                            alt={person.name}
                            height={300}
                            width={300}
                        />
                    )}
                </div>

                {size === 'large' && <div className={styles.container__amountBadge}>{person.movies.length}</div>}
            </div>

            <div className={styles.container__textContainer}>
                <h2 className={styles.container__fullName}>
                    {locale === 'en' && person.enName ? person.enName.split(' ')[0] : person.name.split(' ')[0]}
                    <br />
                    {locale === 'en' && person.enName ? person.enName.split(' ')[1] : person.name.split(' ')[1]}
                </h2>

                {size === 'small' ? (
                    <h3 className={styles.container__role}>
                        {locale === 'ru' ? person.profession : person.enProfession}
                    </h3>
                ) : (
                    <p className={styles.container__amountMovies}>
                        {person.movies.length}{' '}
                        {declineWord(person.movies.length, [
                            t('filmography.singleMovie'),
                            t('filmography.fewMovies'),
                            t('filmography.manyMovies'),
                        ])}
                    </p>
                )}
            </div>
        </Link>
    );
};

export default ActorItem;
