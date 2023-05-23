import MoviePlayer from '@/components/movie/MoviePlayer/MoviePlayer';
import styles from '@/styles/pages/CardMoviePage.module.scss';
import MovieInfo from '@/components/movie/MovieInfo/MovieInfo';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import MovieDevicesImage from '@/components/movie/MovieDevicesImage/MovieDevicesImage';
import MovieAppeal from '@/components/movie/MovieAppeal/MovieAppeal';
import PersonsSection from '@/components/sections/PersonsSection/PersonsSection';
import MoreModal from '@/components/modals/MoreModal/MoreModal';
import { useRouter } from 'next/router';
import MoviesSection from '@/components/sections/MoviesSection/MoviesSection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import IMovie from '@/models/IMovie';
import axios from 'axios';
import IGenre from '@/models/IGenre';
import ICountry from '@/models/ICountry';
import IPerson from '@/models/IPerson';
import TrailerModal from '@/components/modals/TrailerModal/TrailerModal';
import { firstCapitalLetter } from '@/utils/functions';
import Loading from '@/components/Loading/Loading';
import PageNotCreated from '@/components/PageNotCreated/PageNotCreated';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common', 'footer', 'header', 'modals', 'movie', 'moviesPage'])),
    },
});

export const getStaticPaths = async () => {
    return {
        paths: ['/movies/id'],
        fallback: true,
    };
};

function CardMoviePage() {
    const { t } = useTranslation(['movie', 'moviesPage']);
    const { query } = useRouter();
    const queryParams = Object.keys(query);
    const router = useRouter();
    const { id } = router.query;
    const locale = router.locale;

    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState<IMovie>();

    useEffect(() => {
        const getPerson = async () => {
            try {
                const requestMovie = await axios.get(`http://localhost:6125/film/${id}`);
                console.log(requestMovie.data);

                let genres: IGenre[] = [];
                for (let i = 0; i < requestMovie.data.genres.length; i++) {
                    genres.push({
                        id: i,
                        name: requestMovie.data.genres[i].name,
                        enName: requestMovie.data.genres[i].enName,
                    });
                }

                let countries: ICountry[] = [];
                for (let i = 0; i < requestMovie.data.countries.length; i++) {
                    countries.push({
                        id: i,
                        name: requestMovie.data.countries[i].name,
                    });
                }

                let persons: IPerson[] = [];
                for (let i = 0; i < 10; i++) {
                    persons.push({
                        id: requestMovie.data.persons[i].personid,
                        name: requestMovie.data.persons[i].name
                            ? requestMovie.data.persons[i].name
                            : requestMovie.data.persons[i].enName,
                        enName: requestMovie.data.persons[i].enName,
                        photo: requestMovie.data.persons[i].photo,
                        profession: requestMovie.data.persons[i].profession,
                        enProfession: requestMovie.data.persons[i].enProfession,
                        movies: [],
                    });
                }

                setMovie({
                    id: requestMovie.data.film.id,
                    type: requestMovie.data.film.type,
                    name: requestMovie.data.film.name,
                    enName: requestMovie.data.film.alternativeName,
                    posterUrl: requestMovie.data.film.posterurl,
                    posterPreviewUrl: requestMovie.data.film.posterpreviewUrl,
                    year: requestMovie.data.film.year,
                    description: requestMovie.data.film.description,
                    shortDescription: requestMovie.data.film.shortDescription,
                    ageRating: requestMovie.data.film.ageRating,
                    ratingKp: requestMovie.data.film.ratingkp,
                    votesKp: requestMovie.data.film.voteskp,
                    movieLength: requestMovie.data.film.movieLength,
                    genres: genres,
                    countries: countries,
                    persons: persons,
                    trailer: requestMovie.data.videos[1].url,
                    watchingWithMovie: [],
                    comments: [],
                });
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getPerson();
    }, [id]);

    return (
        <MainContainer
            keywords={['movie', 'ivi']}
            title={
                loading
                    ? `${t('loading', { ns: 'moviesPage' })}`
                    : movie
                    ? locale === 'ru'
                        ? `${movie.name} (Фильм ${movie.year}) ${t('browserTab')}`
                        : `${movie.enName} (${firstCapitalLetter(movie.type)} ${movie.year}) ${t('browserTab')}`
                    : `${t('pageError', { ns: 'moviesPage' })}`
            }
            page="other"
        >
            {loading ? (
                <div className="container">
                    <Loading />
                </div>
            ) : movie ? (
                <div className={[styles.container, 'container'].join(' ')}>
                    <section className={[styles.container__page, styles.page].join(' ')}>
                        <div className={styles.page__block}>
                            <div className={styles.page__blockPlayer}>
                                <div className={styles.page__blockPlayerSticky}>
                                    <MoviePlayer />
                                </div>
                            </div>

                            <div className={styles.page__blockInfo}>
                                <MovieInfo movie={movie} />
                            </div>
                        </div>
                    </section>

                    <section className={styles.container__watch}>
                        <MoviesSection
                            title={`${t('withMovie.0')} «${movie.name}» ${t('withMovie.1')}`}
                            movies={movie.watchingWithMovie}
                            href=""
                        />
                    </section>

                    <section className={styles.container__persons}>
                        <PersonsSection size="small" persons={movie.persons} />
                    </section>

                    <section className={[styles.container__devices, styles.devices].join(' ')}>
                        <div className={styles.devices__appeal}>
                            <MovieAppeal title={locale === 'ru' ? movie.name : movie.enName} />
                        </div>
                        <div className={styles.devices__image}>
                            <MovieDevicesImage poster={movie.posterUrl} title={movie.name} />
                        </div>
                    </section>
                </div>
            ) : (
                <div className="container">
                    <PageNotCreated />
                </div>
            )}

            {movie && queryParams.includes('more') && <MoreModal movie={movie} />}
            {movie && queryParams.includes('trailer') && <TrailerModal trailer={movie.trailer} />}
        </MainContainer>
    );
}

export default CardMoviePage;
