import styles from './FilmographyItem.module.scss';
import ButtonUI from '@/components/UI/buttons/Button/ButtonUI';
import Image from 'next/image';
import poster_1 from './samples/poster_1.jpeg';
import Link from 'next/link';
import IMovie from '@/models/IMovie';

interface FilmographyItemProps {
    movie: IMovie;
}

const FilmographyItem = ({ movie }: FilmographyItemProps) => {
    return (
        <div className={styles.container}>
            <Link href={`/movies/${movie.name}`} className={styles.container__body}>
                <div className={styles.container__imageWrapper}>
                    <Image src={movie.image} height={123} width={80} alt={`Постер ${movie.name}`} />
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

                    <ButtonUI shape="large" className={styles.container__button} background="gray">
                        Подробнее
                    </ButtonUI>
                </div>
            </Link>
        </div>
    );
};

export default FilmographyItem;
