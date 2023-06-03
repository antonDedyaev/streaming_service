import styles from './MovieInfo.module.scss';
import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import MovieParams from '../MovieParams/MovieParams';
import MovieRating from '../MovieRating/MovieRating';
import MovieOptions from '../MovieOptions/MovieOptions';
import MovieMedallionsList from '../movieMedallion/MovieMedallionsList/MovieMedallionsList';
import MoviePlayer from '../MoviePlayer/MoviePlayer';
import MovieButtons from '../MovieButtons/MovieButtons';
import { useTranslation } from 'next-i18next';
import IMovie from '@/models/IMovie';
import { useRouter } from 'next/router';
import { firstCapitalLetter } from '@/utils/functions';

interface MovieInfoProps {
    movie: IMovie;
}

const MovieInfo = ({ movie }: MovieInfoProps) => {
    const { t } = useTranslation('movie');
    const { locale } = useRouter();

    return (
        <div className={styles.container} data-testid="movieInfo">
            <h1 className={styles.container__title}>
                {locale === 'ru'
                    ? `${movie.name ? movie.name : movie.enName} (Фильм ${movie.year})`
                    : `${movie.enName ? movie.enName : movie.name} (${firstCapitalLetter(movie?.type)} ${movie?.year})`}
            </h1>

            <div className={styles.container__params}>
                <MovieParams movie={movie} />
            </div>

            <div className={styles.container__player}>
                <MoviePlayer />
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
                            {movie.shortDescription && <p>{movie.shortDescription}</p>}
                            <p>{movie.description}</p>
                            <p>
                                Приглашаем поклонников вдохновляющих и трогательных историях про поиск себя и своей
                                внутренней силы посмотреть онлайн фильм «{locale === 'ru' ? movie.name : movie.enName}».
                            </p>
                            <p>
                                Приглашаем посмотреть фильм «{locale === 'ru' ? movie.name : movie.enName}» в нашем
                                онлайн-кинотеатре в хорошем HD качестве. Приятного просмотра!
                            </p>

                            <div className={styles.container__blockSpoilerOptions}>
                                <MovieOptions />
                            </div>
                        </SpoilerUI>
                    </div>

                    <div className={styles.container__blockRatingBox}>
                        <MovieRating movie={movie} />
                    </div>

                    <div className={styles.container__blockOptions}>
                        <MovieOptions />
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
