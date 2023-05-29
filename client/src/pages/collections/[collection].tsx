import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import FilterList from '@/components/filters/FilterList';
import FilterPanel from '@/components/filters/FilterPanel';
import panelStyles from '../../components/filters/FilterPanel.module.scss';
import FilterPlank from '@/components/filters/FilterPlank';
import plankStyles from '@/components/filters/FilterPlank.module.scss';
import FilterRange from '@/components/filters/FilterRange';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';

import styles from '@/styles/pages/CollectionPage.module.scss';
import icon from '@/../public/icons/rating.svg';
import FilterSearch from '@/components/filters/FilterSearch';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { useRouter } from 'next/router';
/*import useSWR from 'swr';*/
import PostersList from '@/components/posters/PostersList/PostersList';
import { fetchCountries, fetchGenres, fetchMovies } from '@/store/slices/moviesSlice';
import { getCollection } from '../../utils/moviesHelpers';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import BorderedButton from '@/components/UI/buttons/BorderedButton/BorderedButton';
import SortMovies from '@/components/movie/SortMovies/SortMovies';
import IGenre from '@/models/IGenre';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'collection',
            'common',
            'footer',
            'header',
            'moviesPage',
            'mainPage',
            'modals',
        ])),
    },
});

// const swr = (url: string) => {
//     const { data, error } = useSWR(url, async () => await axios.get(url).then((res) => res.data));
//     return data;
// };

const Collection = () => {
    const { t } = useTranslation();
    const { asPath, locale } = useRouter();
    const dispatch = useAppDispatch();

    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [shownPostersLimit, setShownPostersLimit] = useState(35);

    const filteredList = useAppSelector((state) => state.movies.filteredMovies);

    const allCountries = useAppSelector((state) => state.movies.countries);
    const countryNames = allCountries.map(({ name }: { name: string }) => name);
    const countriesList = Array.from(new Set<string>(countryNames)).sort();

    const genres = useAppSelector((state) => state.movies.genres);

    useEffect(() => {
        setIsFilterApplied(filteredList.length !== 0);
    }, [filteredList]);

    useEffect(() => {
        dispatch(fetchMovies());
        dispatch(fetchCountries());
        dispatch(fetchGenres());
    }, [locale, asPath]);

    const path = asPath.split('/').slice(-1)[0].split('-');
    const dynamicHeader =
        path.length === 1
            ? t(`mainPage:${path[0]}`)
            : t(`moviesPage:${path[0] + path[1][0].toUpperCase() + path[1].slice(1)}`);

    const movies = useAppSelector((state) => state.movies.movies);
    const collectionTitle = asPath.split('/').slice(-1)[0];
    const collection = getCollection(collectionTitle, movies, genres, countriesList);

    const renderedList = filteredList.length !== 0 ? filteredList : collection;

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
                            {dynamicHeader} {t('moviesPage:moviesSpoiler.header')}
                        </h2>
                        {/* <SpoilerUI shownLines={2} toggleButtonTexts={[t('showSpoiler'), t('hideSpoiler')]}>
                            <p>{t('moviesPage:moviesSpoiler.content.0')}</p>
                            <p>{t('moviesPage:moviesSpoiler.content.1')}</p>
                            <p>{t('moviesPage:moviesSpoiler.content.2')}</p>
                            <p>{t('moviesPage:moviesSpoiler.content.3')}</p>
                            <p>{t('moviesPage:moviesSpoiler.content.4')}</p>
                        </SpoilerUI> */}
                    </div>
                    <div className={styles.container__controlButtons}>
                        <button onClick={() => setShowFilterPanel(!showFilterPanel)}>
                            <div className={styles.container__filtersButtonText}>
                                {!showFilterPanel ? t('collection:filters') : t('collection:collapse')}
                            </div>
                        </button>
                        <SortMovies filteredMovies={collection!} />
                    </div>

                    <FilterPanel
                        className={[
                            panelStyles.container__panel,
                            showFilterPanel ? panelStyles.container__panel_open : panelStyles.container__panel_hidden,
                        ].join(' ')}
                        isFilterApplied={isFilterApplied}
                    >
                        <FilterPlank
                            title={t('moviesPage:filterPanel.genres')}
                            className={plankStyles.container__dropdown_leftPositioned}
                        >
                            <FilterList
                                items={
                                    locale === 'ru'
                                        ? genres.map((genre) => genre.name).sort()
                                        : genres.map((genre) => genre.enName).sort()
                                }
                                category="genres"
                            />
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

                    <div className={styles.container__list}>
                        <PostersList
                            posterType="preview"
                            movies={renderedList!.slice(0, shownPostersLimit)}
                        ></PostersList>
                        {renderedList!.length > shownPostersLimit && (
                            <BorderedButton
                                size="large"
                                className={styles.container__paginationButton}
                                onClick={() => setShownPostersLimit(shownPostersLimit + 35)}
                            >
                                {t('moviesPage:showMore')}
                            </BorderedButton>
                        )}
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default Collection;
