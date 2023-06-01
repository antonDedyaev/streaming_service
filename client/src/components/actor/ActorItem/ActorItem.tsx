import Link from 'next/link';
import styles from './ActorItem.module.scss';
import Image from 'next/image';
import IPerson from '../../../models/IPerson';
import { declineWord, firstCapitalLetter, professionInTheSingular } from '../../../utils/functions';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface ActorItemProps {
    className?: string;
    person: IPerson;
    size: 'large' | 'medium' | 'small';
    closeModal?: (close: boolean) => void;
}

const ActorItem = ({ className, person, size, closeModal }: ActorItemProps) => {
    const { t } = useTranslation('moviesPage');
    const { locale } = useRouter();

    const nameRu = person.name ? [person.name.split(' ', 1).toString(), person.name.split(' ').slice(1).join(' ')] : '';
    const nameEn = person.enName
        ? [person.enName.split(' ', 1).toString(), person.enName.split(' ').slice(1).join(' ')]
        : '';
    return (
        <Link
            href={`/persons/${person.id}`}
            onClick={() => closeModal?.(true)}
            className={[styles.container, styles[`container_${size}`], className].join(' ')}
        >
            <div className={styles.container__imageContainer}>
                <div className={styles.container__imageWrapper}>
                    {person.photo && (
                        <Image
                            className={styles.container__image}
                            src={person.photo}
                            alt={`${person.name} ${person.enName}`}
                            height={300}
                            width={300}
                        />
                    )}
                </div>

                {size === 'large' && <div className={styles.container__amountBadge}>{person.countMovies}</div>}
            </div>

            <div className={styles.container__textContainer}>
                <h2 className={styles.container__fullName}>
                    {locale === 'ru' ? (nameRu[0] ? nameRu[0] : nameEn[0]) : nameEn[0] ? nameEn[0] : nameRu[0]}
                    <br />
                    {locale === 'ru' ? (nameRu[1] ? nameRu[1] : nameEn[1]) : nameEn[1] ? nameEn[1] : nameRu[1]}
                </h2>

                {size === 'small' ? (
                    <h3 className={styles.container__role}>
                        {locale === 'ru'
                            ? professionInTheSingular(person.profession[0])
                            : person.enProfession[0] === 'voice_actor'
                            ? 'Voice actor'
                            : firstCapitalLetter(person.enProfession[0])}
                    </h3>
                ) : (
                    person.countMovies && (
                        <p className={styles.container__amountMovies}>
                            {person.countMovies}{' '}
                            {declineWord(person.countMovies, [
                                t('filmography.singleMovie'),
                                t('filmography.fewMovies'),
                                t('filmography.manyMovies'),
                            ])}
                        </p>
                    )
                )}
            </div>
        </Link>
    );
};

export default ActorItem;
