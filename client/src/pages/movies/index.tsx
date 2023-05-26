import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import FilterList from '@/components/filters/FilterList';
import FilterPanel from '@/components/filters/FilterPanel';
import FilterPlank from '@/components/filters/FilterPlank';
import plankStyles from '@/components/filters/FilterPlank.module.scss';
import FilterRange from '@/components/filters/FilterRange';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import MoviesSection from '@/components/sections/MoviesSection/MoviesSection';
import PersonsSection from '@/components/sections/PersonsSection/PersonsSection';
import styles from '@/styles/pages/MoviesPage.module.scss';
import icon from '@/../public/icons/rating.svg';
import FilterSearch from '@/components/filters/FilterSearch';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetchMovies } from '@/store/slices/moviesSlice';
import IActor from '@/models/IActor';
import { fetchActors } from '@/store/slices/actorsSlice';
import PostersList from '@/components/posters/PostersList/PostersList';
import TransparentButton from '@/components/UI/buttons/TransparentButton/TransparentButton';
import BorderedButton from '@/components/UI/buttons/BorderedButton/BorderedButton';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import SortMovies from '@/components/movie/SortMovies/SortMovies';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'collection',
            'common',
            'footer',
            'header',
            'moviesPage',
            'modals',
        ])),
    },
});

function MoviesPage() {
    // const address = 'http://localhost:6125/filmswithinfo';
    // const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);
    // const { data, error } = useSWR(address, fetcher);

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { asPath, locale } = useRouter();
    const [countriesList, setCountriesList] = useState<string[]>([]);
    const [genresList, setGenresList] = useState<string[]>([]);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [shownPostersLimit, setShownPostersLimit] = useState(35);

    const filteredList = useAppSelector((state) => state.movies.filteredMovies);
    const filters = useAppSelector((state) => state.movies.filters);
    console.log('MoviesFilterList:', filteredList);

    useEffect(() => {
        setIsFilterApplied(filteredList.length !== 0);
    }, [filteredList]);

    const movies = useAppSelector((state) => state.movies.movies);
    const actors = useAppSelector((state) => state.actors.actors);
    const filteredActors = actors.filter((actor) => actor.name && actor.photo);

    const premieres = movies
        .filter((movie) => movie.premiereRussia)
        .sort(
            (a, b) =>
                new Date(new Date(b.premiereRussia) < new Date(String(b.year)) ? b.premiereRussia : b.year).getTime() -
                new Date(new Date(a.premiereRussia) < new Date(String(a.year)) ? a.premiereRussia : a.year).getTime(),
        );

    const bestMovies = movies.filter((movie) => movie.ratingKp).sort((a, b) => b.ratingKp - a.ratingKp);

    const imaxMovies = movies
        .filter((movie) => movie.hasIMAX)
        .sort((a, b) => new Date(b.premiereRussia).getTime() - new Date(a.premiereRussia).getTime());

    useEffect(() => {
        dispatch(fetchMovies());
        dispatch(fetchActors());

        //dispatch(moviesAdded(data));

        const getCountries = async () => {
            try {
                const requestCountries = await axios.get('http://localhost:6125/namesOfCountries');
                // const countries = requestCountries.data.map(({ name }: { name: string }) => name);
                // const unique = new Set<string>(countries);
                // const arr = Array.from(unique);
                setCountriesList(requestCountries.data.sort());
            } catch (err) {
                console.log(err);
            }
        };
        const getGenres = async () => {
            try {
                const requestGenres = await axios.get('http://localhost:6125/namesgenres');
                const genres = requestGenres.data.map(({ name }: { name: string }) => name);
                setGenresList(genres.sort());
            } catch (err) {
                console.log(err);
            }
        };

        getCountries();
        getGenres();
    }, [locale]);

    return (
        <MainContainer
            keywords={['homePage', 'iviEtoKryto']}
            title="Смотреть фильмы онлайн бесплатно в хорошем HD качестве и без регистрации. Удобный просмотр онлайн фильмов на ivi.ru"
            page="home"
        >
            <div className="container">
                <div className={styles.container}>
                    <div className={styles.container__spoiler}>
                        <Breadcrumbs path={asPath.split('/').slice(1)} />

                        <h2 className={styles.container__title}>
                            {t('moviesPage:moviesSpoiler.sectionTitle')} {t('moviesPage:moviesSpoiler.header')}
                        </h2>
                        <SpoilerUI shownLines={2} toggleButtonTexts={[t('showSpoiler'), t('hideSpoiler')]}>
                            <p>{t('moviesPage:moviesSpoiler.content.0')}</p>
                            <p>{t('moviesPage:moviesSpoiler.content.1')}</p>
                            <p>{t('moviesPage:moviesSpoiler.content.2')}</p>
                            <p>{t('moviesPage:moviesSpoiler.content.3')}</p>
                            <p>{t('moviesPage:moviesSpoiler.content.4')}</p>
                        </SpoilerUI>
                    </div>
                    {isFilterApplied && <SortMovies filteredMovies={filteredList} />}
                    <FilterPanel isFilterApplied={isFilterApplied}>
                        <FilterPlank
                            title={t('moviesPage:filterPanel.genres')}
                            className={plankStyles.container__dropdown_leftPositioned}
                        >
                            <FilterList items={genresList} category="genres" />
                        </FilterPlank>

                        <FilterPlank
                            title={t('moviesPage:filterPanel.countries')}
                            className={plankStyles.container__dropdown_centerPositioned}
                        >
                            <FilterList items={countriesList} category="countries" />
                        </FilterPlank>

                        <FilterPlank
                            title={t('moviesPage:filterPanel.rating')}
                            className={styles.container__filterItem}
                        >
                            <FilterRange category="ratingKp" image={icon} limit={10} step={0.1} />
                        </FilterPlank>

                        <FilterPlank
                            title={t('moviesPage:filterPanel.userRank')}
                            className={styles.container__filterItem}
                        >
                            <FilterRange category="votesKp" image={icon} limit={1000000} step={100} />
                        </FilterPlank>

                        <FilterPlank
                            title={t('moviesPage:filterPanel.director')}
                            className={styles.container__filterItem}
                        >
                            <FilterSearch searchBy="Режиссер" />
                        </FilterPlank>

                        <FilterPlank title={t('moviesPage:filterPanel.actor')} className={styles.container__filterItem}>
                            <FilterSearch searchBy="Актер" />
                        </FilterPlank>
                    </FilterPanel>
                    {!isFilterApplied ? (
                        <>
                            <div className={styles.container__section}>
                                <MoviesSection
                                    title={t('moviesPage:newReleases')}
                                    movies={premieres.slice(0, 18)}
                                    href="/collections/new-releases"
                                />
                            </div>

                            <div className={styles.container__section}>
                                <MoviesSection
                                    title={t('moviesPage:bestMovies')}
                                    movies={bestMovies.slice(0, 18)}
                                    href="/collections/best-movies"
                                />
                            </div>
                            <div className={styles.container__section}>
                                <PersonsSection size="large" persons={filteredActors} />
                            </div>
                            <div className={styles.container__section}>
                                <MoviesSection
                                    title={t('moviesPage:imaxMovies')}
                                    movies={imaxMovies.slice(0, 18)}
                                    href="/collections/imax-movies"
                                />
                            </div>
                        </>
                    ) : (
                        <div className={styles.container__list}>
                            <PostersList
                                posterType="preview"
                                movies={filteredList.slice(0, shownPostersLimit)}
                            ></PostersList>
                            {filteredList.length > shownPostersLimit && (
                                <BorderedButton
                                    size="large"
                                    className={styles.container__paginationButton}
                                    onClick={() => setShownPostersLimit(shownPostersLimit + 35)}
                                >
                                    {t('moviesPage:showMore')}
                                </BorderedButton>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainContainer>
    );
}

export default MoviesPage;
