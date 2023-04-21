import styles from './FilmographyItem.module.scss';
import ButtonUI from '@/components/UI/buttons/Button/ButtonUI';
import Image from 'next/image';
import poster_1 from './test_posters/poster_1.jpeg';

interface FilmographyItemProps {
    poster: string;
    year: number;
    title: string;
    rating: number;
    license?: boolean;
}

const FilmographyItem = ({ poster, year, title, rating }: FilmographyItemProps) => {
    return (
        <div className={styles.filmographyItem}>
            <a href="/watch/506413" className={styles.filmographyItem__body}>
                <div className={styles.filmographyItem__poster}>
                    <div>
                        <div className={styles.poster__imageWrapper}>
                            <Image
                                /*poster*/
                                src={poster_1}
                                height={123}
                                width={80}
                                alt={`Постер ${title}`}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.filmographyItem__main}>
                    <div className={styles.filmographyItem__main__info}>
                        <div className={styles.filmographyItem__main__year}>
                            <span>{/*year*/}2023</span>
                        </div>
                        <div className={styles.filmographyItem__main__title} title="Стать Маугли">
                            {/*title*/}Стать Маугли
                        </div>
                        {/*В зависимости от наличия рейтинга*/}
                        <div className={styles.filmographyItem__main__rating}>
                            <span className={styles.filmographyItem__main__ratingLabel}>Рейтинг Иви:</span>
                            <span className={styles.filmographyItem__main__ratingValue}>{/*rating*/}7.2</span>
                        </div>
                    </div>
                    <div className={styles.filmographyItem__action}>
                        <div className={styles.filmographyItem__action__wrapper}>
                            <ButtonUI
                                variant="large"
                                className={styles.filmographyItem__action__text}
                                background="gray"
                            >
                                {/*Оставляем один вариант кнопки*/}
                                Подробнее
                            </ButtonUI>
                            <div className={styles.filmographyItem__action__text}></div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default FilmographyItem;
