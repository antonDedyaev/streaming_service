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
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'common',
            'footer',
            'header',
            'modals',
            'movie',
            'moviesPage',
            'collection',
        ])),
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
    const { query, asPath } = useRouter();
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
                        enName: requestMovie.data.countries[i].name,
                    });
                }

                let persons: IPerson[] = [];
                for (let i = 0; i < requestMovie.data.persons.length - 1; i++) {
                    persons.push({
                        id: requestMovie.data.persons[i].id,
                        name: requestMovie.data.persons[i].name,
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
                    enName: requestMovie.data.film.enName,
                    posterUrl: requestMovie.data.film.posterUrl,
                    posterPreviewUrl: requestMovie.data.film.posterPreviewUrl,
                    year: requestMovie.data.film.year,
                    description: requestMovie.data.film.description,
                    shortDescription: requestMovie.data.film.shortDescription,
                    ageRating: requestMovie.data.film.ageRating,
                    ratingKp: requestMovie.data.film.ratingKp,
                    votesKp: requestMovie.data.film.votesKp,
                    movieLength: requestMovie.data.film.movieLength,
                    genres: genres,
                    countries: countries,
                    persons: persons,
                    trailer: requestMovie.data.trailer[1].url,
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
                        ? `${movie.name ? movie.name : movie.enName} (Фильм ${movie.year}) ${t('browserTab')}`
                        : `${movie.enName ? movie.enName : movie.name} (${firstCapitalLetter(movie.type)} ${
                              movie.year
                          }) ${t('browserTab')}`
                    : `${t('pageError', { ns: 'moviesPage' })}`
            }
            page="other"
        >
            {loading ? (
                <div className="container">
                    <Loading />
                </div>
            ) : movie ? (
                <div className="container">
                    <div className={styles.container}>
                        <section>
                            <Breadcrumbs
                                path={asPath.split('/').slice(1)}
                                genre={{
                                    id: movie.genres[0].id,
                                    name: movie.genres[0].name,
                                    enName: movie.genres[0].enName,
                                }}
                                ponytailName={{ name: movie.name, enName: movie.enName }}
                                type="pointShort"
                            />
                        </section>

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
                                title={`${t('withMovie.0')} «${
                                    locale === 'ru'
                                        ? movie.name
                                            ? movie.name
                                            : movie.enName
                                        : movie.enName
                                        ? movie.enName
                                        : movie.name
                                }» ${t('withMovie.1')}`}
                                movies={movie.watchingWithMovie}
                                href=""
                            />
                        </section>

                        {movie.persons.length > 0 && (
                            <section className={styles.container__persons}>
                                <PersonsSection size="small" persons={movie.persons} />
                            </section>
                        )}

                        <section className={[styles.container__devices, styles.devices].join(' ')}>
                            <div className={styles.devices__appeal}>
                                <MovieAppeal
                                    title={
                                        locale === 'ru'
                                            ? movie.name
                                                ? movie.name
                                                : movie.enName
                                            : movie.enName
                                            ? movie.enName
                                            : movie.name
                                    }
                                />
                            </div>
                            <div className={styles.devices__image}>
                                <MovieDevicesImage poster={movie.posterUrl} title={movie.name} />
                            </div>
                        </section>
                        <section>
                            <Breadcrumbs
                                path={asPath.split('/').slice(1)}
                                genre={{
                                    id: movie.genres[0].id,
                                    name: movie.genres[0].name,
                                    enName: movie.genres[0].enName,
                                }}
                                ponytailName={{
                                    name: movie.name ? movie.name : movie.enName,
                                    enName: movie.enName ? movie.enName : movie.name,
                                }}
                                type="point"
                            />
                        </section>
                    </div>
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
