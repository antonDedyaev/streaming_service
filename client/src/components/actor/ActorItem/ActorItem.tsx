import Link from 'next/link';
import styles from './ActorItem.module.scss';
import Image from 'next/image';
import IPerson from '../../../models/IPerson';
import { declineWord } from '../../../utils/functions';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface ActorItemProps {
    className?: string;
    actor: IPerson;
    size: 'large' | 'medium' | 'small';
}

const ActorItem = ({ className, actor, size }: ActorItemProps) => {
    const { t } = useTranslation('moviesPage');
    const { locale } = useRouter();
    return (
        <Link
            href={`actors/${actor.id}`}
            className={[styles.container, styles[`container_${size}`], className].join(' ')}
        >
            <div className={styles.container__imageContainer}>
                <div className={styles.container__imageWrapper}>
                    {actor.photo && (
                        <Image className={styles.container__image} src={actor.photo} alt={actor.name} fill />
                    )}
                </div>

                {size === 'large' && <div className={styles.container__amountBadge}>{actor.movies.length}</div>}
            </div>

            <div className={styles.container__textContainer}>
                <h2 className={styles.container__fullName}>
                    {locale === 'en' && actor.enName ? actor.enName.split(' ')[0] : actor.name.split(' ')[0]}
                    <br />
                    {locale === 'en' && actor.enName ? actor.enName.split(' ')[1] : actor.name.split(' ')[1]}
                </h2>

                {size === 'small' ? (
                    <h3 className={styles.container__role}>{actor.profession}</h3>
                ) : (
                    <p className={styles.container__amountMovies}>
                        {actor.movies.length}{' '}
                        {declineWord(actor.movies.length, [
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
