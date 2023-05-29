import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import styles from '@/styles/pages/CardPersonPage.module.scss';
import ImgSquareUI from '@/components/UI/squares/ImgSquareUI/ImgSquareUI';
import FilmographySection from '@/components/sections/FilmographySection/FilmographySection';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import IPerson from '@/models/IPerson';
import IMovies from '@/models/IMovies';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PageNotCreated from '@/components/PageNotCreated/PageNotCreated';
import Loading from '@/components/Loading/Loading';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { firstCapitalLetter, professionInTheSingular } from '@/utils/functions';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'common',
            'footer',
            'header',
            'modals',
            'person',
            'moviesPage',
            'collection',
        ])),
    },
});

export const getStaticPaths = async () => {
    return {
        paths: ['/persons/id'],
        fallback: true,
    };
};

function CardActorPage() {
    const { t } = useTranslation(['person', 'moviesPage']);
    const router = useRouter();
    const { id } = router.query;
    const locale = router.locale;
    const asPath = router.asPath;

    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState<IPerson>();

    useEffect(() => {
        const getPerson = async () => {
            try {
                const requestPerson = await axios.get(`http://localhost:6125/personswithinfo/${id}`);

                const movies: IMovies[] = [];
                for (let i = 0; i < requestPerson.data[0].movies.length; i++) {
                    const movie = await axios.get(`http://localhost:6125/film/${requestPerson.data[0].movies[i]}`);

                    movies.push({
                        id: movie.data.film.id,
                        name: movie.data.film.name,
                        enName: movie.data.film.enName,
                        posterPreviewURL: movie.data.film.posterPreviewURL,
                        premiereRussia: movie.data.film.premiereRussia,
                        hasIMAX: movie.data.film.hasIMAX,

                        year: movie.data.film.year,
                        ageRating: movie.data.film.ageRating,
                        ratingKp: movie.data.film.ratingKp,
                        votesKp: movie.data.film.votesKp,
                        movieLength: movie.data.film.movieLength,
                        genres: [],
                        countries: [],
                    });
                }

                setPerson({
                    id: requestPerson.data[0].id,
                    name: requestPerson.data[0].name,
                    enName: requestPerson.data[0].enName,
                    photo: requestPerson.data[0].photo,
                    profession: requestPerson.data[0].profession,
                    enProfession: requestPerson.data[0].enProfession,
                    movies: movies,
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
            keywords={['person']}
            title={
                loading
                    ? `${t('loading', { ns: 'moviesPage' })}`
                    : person
                    ? locale === 'ru'
                        ? `${person.name ? person.name : person.enName}${
                              person.name ? (person.enName ? ` (${person.enName})` : '') : ''
                          }: ${t('browserTab')}. ${professionInTheSingular(person.profession)}.`
                        : `${person.enName ? person.enName : person.name}${
                              person.enName ? (person.name ? ` (${person.name})` : '') : ''
                          }: ${t('browserTab')}. ${
                              person.enProfession === 'voice_actor'
                                  ? 'Voice actor'
                                  : firstCapitalLetter(person.enProfession)
                          }.`
                    : `${t('pageError', { ns: 'moviesPage' })}`
            }
            page="other"
        >
            {loading ? (
                <div className="container">
                    <Loading />
                </div>
            ) : person ? (
                <div className="container">
                    <div className={styles.back} onClick={() => router.back()}>
                        <img src="/icons/arrows/arrow_left.svg" alt="arrow left" />
                        {t('back')}
                    </div>

                    <div className={styles.container}>
                        <section className={[styles.container__info, styles.info].join(' ')}>
                            {person.photo && (
                                <div className={styles.info__img}>
                                    <ImgSquareUI person={person} border="medium" />
                                </div>
                            )}
                            <h1 className={styles.info__title}>
                                {locale === 'ru'
                                    ? person.name
                                        ? person.name
                                        : person.enName
                                    : person.enName
                                    ? person.enName
                                    : person.name}
                            </h1>
                            {locale === 'en' && person.enName && (
                                <span className={styles.info__alternate}>{person.name}</span>
                            )}
                            {locale === 'ru' && person.name && (
                                <span className={styles.info__alternate}>{person.enName}</span>
                            )}
                        </section>
                        {person.movies && (
                            <section className={styles.container__filmography}>
                                <FilmographySection movies={person.movies} />
                            </section>
                        )}
                        <section className={styles.container__breadcrumbs}>
                            <Breadcrumbs
                                path={asPath.split('/').slice(1)}
                                type="slash"
                                ponytailName={{
                                    name: person.name ? person.name : person.enName,
                                    enName: person.enName ? person.enName : person.name,
                                }}
                            />
                        </section>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <PageNotCreated />
                </div>
            )}
        </MainContainer>
    );
}

export default CardActorPage;
