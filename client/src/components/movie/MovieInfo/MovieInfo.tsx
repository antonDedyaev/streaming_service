import styles from './MovieInfo.module.scss';
import { IMovie } from '../movieMedallion/MovieMedallionsList/Temp/IMovie';
import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import MovieParams from '../MovieParams/MovieParams';
import MovieRating from '../MovieRating/MovieRating';
import MovieOptions from '../MovieOptions/MovieOptions';
import MovieMedallionsList from '../movieMedallion/MovieMedallionsList/MovieMedallionsList';

interface MovieInfoProps {
    movie: IMovie;
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
    return (
        <div className={styles.info}>
            <div className={styles.info__title}>{movie.title}</div>
            <div className={styles.info__params}>
                <MovieParams movie={movie} />
            </div>
            <MovieMedallionsList movie={movie} className={styles.info__cards} />
            <div className={styles.info__spoiler}>
                <SpoilerUI
                    toggleButtonTexts={['Детали о фильме', 'Свернуть детали']}
                    shownLines={6}
                    truncateFormat="vertical"
                    buttonTextColor="faded"
                >
                    <p key={movie.description[0]}>{movie.description[0]}</p>
                    {movie.description.slice(1).map((descrip) => (
                        <p key={descrip}>{descrip}</p>
                    ))}
                    <div className={styles.info__spoilerOptions}>
                        <MovieOptions movie={movie} />
                    </div>
                </SpoilerUI>
            </div>

            <div className={styles.info__ratingBox}>
                <MovieRating movie={movie} />
            </div>
            <div className={styles.info__options}>
                <MovieOptions movie={movie} />
            </div>
        </div>
    );
};

export default MovieInfo;
