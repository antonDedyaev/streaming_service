import styles from './MovieRating.module.scss';
import { IMovie } from '../../squareCard/SquareCardsList/Temp/IMovie';
import ButtonUI from '@/components/UI/Button/ButtonUI';

interface MovieRatingProps {
    movie: IMovie;
}

const MovieRating = ({ movie }: MovieRatingProps) => {
    return (
        <ButtonUI className={styles.rating} variant="large" background="transparentWhite">
            <div className={[styles.rating__value, movie.raiting > 7.5 && styles[`rating__value_good`]].join(' ')}>
                {movie.raiting}
            </div>
            <div className={styles.rating__text}>
                <span>Рейтинг</span>
                <span>Интересный сюжет</span>
                <span>118 163 оценки</span>
            </div>
            <div className={styles.rating__estimate}>Оценить</div>
        </ButtonUI>
    );
};

export default MovieRating;
