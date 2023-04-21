import styles from './MovieRating.module.scss';
import { IMovie } from '../../squareCard/SquareCardsList/Temp/IMovie';

interface MovieRatingProps {
    movie: IMovie;
}

const MovieRating = ({ movie }: MovieRatingProps) => {
    return (
        <div className={styles.rating} role="div-rating">
            <div className={[styles.rating__value, movie.raiting > 7.5 && styles[`rating__value_good`]].join(' ')}>
                {movie.raiting}
            </div>
            <div className={styles.rating__text}>
                <span>Рейтинг</span>
                <span>Интересный сюжет</span>
                <span>118 163 оценки</span>
            </div>
            <div className={styles.rating__estimate}>Оценить</div>
        </div>
    );
};

export default MovieRating;
