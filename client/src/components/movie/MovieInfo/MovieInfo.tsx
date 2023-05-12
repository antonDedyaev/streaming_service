import styles from './MovieInfo.module.scss';
import { IMovie } from '../movieMedallion/MovieMedallionsList/Temp/IMovie';
import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import MovieParams from '../MovieParams/MovieParams';
import MovieRating from '../MovieRating/MovieRating';
import MovieOptions from '../MovieOptions/MovieOptions';
import MovieMedallionsList from '../movieMedallion/MovieMedallionsList/MovieMedallionsList';
import MoviePlayer from '../MoviePlayer/MoviePlayer';
import MovieButtons from '../MovieButtons/MovieButtons';
import { useTranslation } from 'next-i18next';

interface MovieInfoProps {
    movie: IMovie;
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
    const { t } = useTranslation('movie');
    return (
        <div className={styles.container}>
            <h1 className={styles.container__title}>{movie.title}</h1>

            <div className={styles.container__params}>
                <MovieParams movie={movie} />
            </div>

            <div className={styles.container__player}>
                <MoviePlayer movie={movie} />
            </div>

            <div className={styles.container__infoBlock}>
                <div className={styles.container__block}>
                    <MovieMedallionsList movie={movie} className={styles.container__blockCards} />
                    <div className={styles.container__blockSpoiler}>
                        <SpoilerUI
                            toggleButtonTexts={[t('showMovieDetails'), t('hideMovieDetails')]}
                            shownLines={6}
                            truncateFormat="vertical"
                            buttonTextColor="faded"
                        >
                            <p key={movie.description[0]}>{movie.description[0]}</p>

                            {movie.description.slice(1).map((descrip) => (
                                <p key={descrip}>{descrip}</p>
                            ))}

                            <div className={styles.container__blockSpoilerOptions}>
                                <MovieOptions movie={movie} />
                            </div>
                        </SpoilerUI>
                    </div>

                    <div className={styles.container__blockRatingBox}>
                        <MovieRating movie={movie} />
                    </div>

                    <div className={styles.container__blockOptions}>
                        <MovieOptions movie={movie} />
                    </div>
                </div>
                <div className={styles.container__buttons}>
                    <MovieButtons />
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;
