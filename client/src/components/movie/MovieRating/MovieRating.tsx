import styles from './MovieRating.module.scss';
import { IMovie } from '../movieMedallion/MovieMedallionsList/Temp/IMovie';
import ButtonUI from '../../UI/buttons/Button/ButtonUI';
import TextSquareUI from '../../UI/squares/TextSquareUI/TextSquareUI';

interface MovieRatingProps {
    movie: IMovie;
}

const MovieRating = ({ movie }: MovieRatingProps) => {
    return (
        <ButtonUI className={styles.rating} shape="large" background="transparent">
            <div className={styles.rating__value}>
                <TextSquareUI value={movie.raiting} textSize="medium" />
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
