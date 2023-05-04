import MoviePlayer from '@/components/movie/MoviePlayer/MoviePlayer';
import styles from '@/styles/pages/CardMoviePage.module.scss';
import { movies } from '@/components/movie/movieMedallion/MovieMedallionsList/Temp/Movie.data';
import MovieInfo from '@/components/movie/MovieInfo/MovieInfo';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import MovieDevicesImage from '@/components/movie/MovieDevicesImage/MovieDevicesImage';
import MovieAppeal from '@/components/movie/MovieAppeal/MovieAppeal';
import PersonsSection from '@/components/sections/PersonsSection/PersonsSection';
import MoreModal from '@/components/modals/MoreModal/MoreModal';
import { useRouter } from 'next/router';
import MoviesSection from '@/components/sections/MoviesSection/MoviesSection';
import { ratingMovies } from '@/components/posters/RatingPoster/ratingMovies.data';

function CardMoviePage() {
    const { query } = useRouter();

    const queryParams = Object.keys(query);
    return (
        <MainContainer keywords={['movie', 'ivi']} title="...смотреть онлайн в хорошем качестве" page="other">
            <div className={[styles.container, 'container'].join(' ')}>
                <section className={[styles.container__page, styles.page].join(' ')}>
                    <div className={styles.page__block}>
                        <div className={styles.page__blockPlayer}>
                            <div className={styles.page__blockPlayerSticky}>
                                <MoviePlayer movie={movies[0]} />
                            </div>
                        </div>

                        <div className={styles.page__blockInfo}>
                            <MovieInfo movie={movies[0]} />
                        </div>
                    </div>
                </section>

                <section className={styles.container__watch}>
                    <MoviesSection title={`С фильмом «${movies[0].title}» смотрят`} movies={ratingMovies} href="" />
                </section>

                <section className={styles.container__persons}>
                    <PersonsSection size="small" persons={movies[0].actors} />
                </section>

                <section className={[styles.container__devices, styles.devices].join(' ')}>
                    <div className={styles.devices__appeal}>
                        <MovieAppeal movie={movies[0]} />
                    </div>
                    <div className={styles.devices__image}>
                        <MovieDevicesImage movie={movies[0]} />
                    </div>
                </section>
            </div>

            {queryParams.includes('more') && <MoreModal movie={movies[0]} />}
        </MainContainer>
    );
}

export default CardMoviePage;
