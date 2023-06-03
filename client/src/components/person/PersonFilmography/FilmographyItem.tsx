import styles from './FilmographyItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import IMovies from '@/models/IMovies';
import ColoredButton from '@/components/UI/buttons/ColoredButton/ColoredButton';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface FilmographyItemProps {
    movie: IMovies;
}

const FilmographyItem = ({ movie }: FilmographyItemProps) => {
    const { t } = useTranslation('person');
    const { locale } = useRouter();
    return (
        <div className={styles.container} data-testid={'filmographyItem'}>
            <Link href={`/movies/${movie.id}`} className={styles.container__body}>
                <div className={styles.container__imageWrapper}>
                    <Image
                        src={movie.posterPreviewURL}
                        height={123}
                        width={80}
                        alt={`Постер ${locale === 'ru' ? movie.name : movie.enName}`}
                    />
                </div>

                <div className={styles.container__main}>
                    <div className={styles.container__infoContainer}>
                        <h2 className={styles.container__year}>{movie.year}</h2>

                        <h2 className={styles.container__title} title={locale === 'ru' ? movie.name : movie.enName}>
                            {locale === 'ru' ? movie.name : movie.enName}
                        </h2>

                        <div className={styles.container__ratingContainer}>
                            <span className={styles.container__ratingLabel}>{t('rating')}: </span>
                            <span className={styles.container__ratingValue}>{movie.ratingKp.toFixed(1)}</span>
                        </div>
                    </div>

                    <ColoredButton size="large" color="gray" className={styles.container__button}>
                        {t('details')}
                    </ColoredButton>
                </div>
            </Link>
        </div>
    );
};

export default FilmographyItem;
