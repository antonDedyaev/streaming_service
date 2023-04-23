import styles from './FilmographyItem.module.scss';
import ButtonUI from '@/components/UI/buttons/Button/ButtonUI';
import Image from 'next/image';
import poster_1 from './samples/poster_1.jpeg';
import Link from 'next/link';

interface FilmographyItemProps {
    poster: string;
    year: number;
    title: string;
    rating: number;

}

const FilmographyItem = ({ poster, year, title, rating }: FilmographyItemProps) => {
    return (
        <div className={styles.container}>
            <Link href={`/movies/${poster}`} className={styles.container__body}>
                <div className={styles.container__imageWrapper}>
                    <Image
                        src={poster_1}
                        height={123}
                        width={80}
                        alt={`Постер ${title}`}
                    />
                </div>

                <div className={styles.container__main}>
                    <div className={styles.container__infoContainer}>
                        <h2 className={styles.container__year}>2023</h2>

                        <h2 className={styles.filmographyItem__title} title="Стать Маугли">
                            Стать Маугли
                        </h2>

                        <div className={styles.container__ratingContainer}>
                            <span className={styles.container__ratingLabel}>Рейтинг Иви:</span>
                            <span className={styles.container__ratingValue}>{/*rating*/}7.2</span>
                        </div>
                    </div>

                    <ButtonUI shape="large" className={styles.container__button} background="gray">
                        Смотреть
                    </ButtonUI>
                </div>
            </Link>
        </div>
    );
};

export default FilmographyItem;
