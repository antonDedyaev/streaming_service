import styles from './FilmographyItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import IMovie from '@/models/IMovie';
import ColoredButton from '@/components/UI/buttons/ColoredButton/ColoredButton';
import { useTranslation } from 'react-i18next';

interface FilmographyItemProps {
    movie: IMovie;
}

const FilmographyItem = ({ movie }: FilmographyItemProps) => {
    const { t } = useTranslation('actor');
    return (
        <div className={styles.container}>
            <Link href={`/movies/${movie.name}`} className={styles.container__body}>
                <div className={styles.container__imageWrapper}>
                    <Image src={movie.posterUrl} height={123} width={80} alt={`Постер ${movie.name}`} />
                </div>

                <div className={styles.container__main}>
                    <div className={styles.container__infoContainer}>
                        <h2 className={styles.container__year}>{movie.year}</h2>

                        <h2 className={styles.container__title} title={movie.name}>
                            {movie.name}
                        </h2>

                        <div className={styles.container__ratingContainer}>
                            <span className={styles.container__ratingLabel}>{t('rating')}: </span>
                            <span className={styles.container__ratingValue}>{movie.ratingKp}</span>
                        </div>
                    </div>

                    <ColoredButton size='large' color='gray' className={styles.container__button}>
                        {t('details')}
                    </ColoredButton>
                </div>
            </Link>
        </div>
    );
};

export default FilmographyItem;
