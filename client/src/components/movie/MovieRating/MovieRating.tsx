import styles from './MovieRating.module.scss';
import { IMovie } from '../movieMedallion/MovieMedallionsList/Temp/IMovie';
import ButtonUI from '../../UI/buttons/Button/ButtonUI';
import TextSquareUI from '../../UI/squares/TextSquareUI/TextSquareUI';

interface MovieRatingProps {
    movie: IMovie;
}

const MovieRating = ({ movie }: MovieRatingProps) => {
    return (
        <ButtonUI className={styles.container} background="transparentWhite">
            <div className={styles.container__value}>
                <TextSquareUI value={movie.raiting} textSize="medium" />
            </div>

            <div className={styles.container__textContainer}>
                <h2 className={[styles.container__text, styles.container__text_rating].join(' ')}>Рейтинг</h2>
                <p className={[styles.container__text, styles.container__text_plot].join(' ')}>Интересный сюжет</p>
                <p className={[styles.container__text, styles.container__text_marks].join(' ')}>118 163 оценки</p>
            </div>

            <div className={styles.container__estimate}>Оценить</div>
        </ButtonUI>
    );
};

export default MovieRating;
