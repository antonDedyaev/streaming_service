import MoviePlayer from '@/components/movie/MoviePlayer/MoviePlayer';
import MainContainer from '@/components/wrappers/MainContainer/MainContainer';
import styles from '@/styles/pages/CardMoviePage.module.scss';
import { movies } from '@/components/movie/movieMedallion/MovieMedallionsList/Temp/Movie.data';
import MovieInfo from '@/components/movie/MovieInfo/MovieInfo';

function CardMoviePage() {
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
            </div>
        </MainContainer>
    );
}

export default CardMoviePage;
