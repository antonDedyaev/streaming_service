import styles from './FilmographyItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import IMovie from '@/models/IMovie';
import ColoredButton from '@/components/UI/buttons/ColoredButton/ColoredButton';

interface FilmographyItemProps {
    movie: IMovie
}

const FilmographyItem = ({ movie }: FilmographyItemProps) => {
    return (
        <div className={styles.container}>
            <Link href={`/movies/${movie.name}`} className={styles.container__body}>
                <div className={styles.container__imageWrapper}>
                    <Image
                        src={movie.image}
                        height={123}
                        width={80}
                        alt={`Постер ${movie.name}`}
                    />
                </div>

                <div className={styles.container__main}>
                    <div className={styles.container__infoContainer}>
                        <h2 className={styles.container__year}>{/*movie.year*/}2023</h2>

                        <h2 className={styles.container__title} title={movie.name}>
                            {movie.name}
                        </h2>

                        <div className={styles.container__ratingContainer}>
                            <span className={styles.container__ratingLabel}>Рейтинг Иви:</span>
                            <span className={styles.container__ratingValue}>{/*movie.rating*/}7.2</span>
                        </div>
                    </div>

                    <ColoredButton size='large' color='gray' className={styles.container__button}>
                        Подробнее
                    </ColoredButton>
                </div>
            </Link>
        </div>
    );
};

export default FilmographyItem;
