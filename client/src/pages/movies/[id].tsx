import MoviePlayer from '@/components/movie/MoviePlayer/MoviePlayer';
import styles from '@/styles/pages/CardMoviePage.module.scss';
import { movies } from '@/components/movie/movieMedallion/MovieMedallionsList/Temp/Movie.data';
import MovieInfo from '@/components/movie/MovieInfo/MovieInfo';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import MovieDevicesImage from '@/components/movie/MovieDevicesImage/MovieDevicesImage';
import MovieAppeal from '@/components/movie/MovieAppeal/MovieAppeal';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common', 'footer', 'header', 'modals', 'movie'])),
    },
});

export const getStaticPaths = async () => {
    return {
        paths: ['/movies/id'],
        fallback: true,
    };
};

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
                <section className={[styles.container__devices, styles.devices].join(' ')}>
                    <div className={styles.devices__appeal}>
                        <MovieAppeal movie={movies[0]} />
                    </div>
                    <div className={styles.devices__image}>
                        <MovieDevicesImage movie={movies[0]} />
                    </div>
                </section>
            </div>
        </MainContainer>
    );
}

export default CardMoviePage;
