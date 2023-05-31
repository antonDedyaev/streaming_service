import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import FilterList from '@/components/filters/FilterList';
import FilterPanel from '@/components/filters/FilterPanel';
import panelStyles from '../../components/filters/FilterPanel.module.scss';
import FilterPlank from '@/components/filters/FilterPlank';
import plankStyles from '@/components/filters/FilterPlank.module.scss';
import FilterRange from '@/components/filters/FilterRange';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';

import styles from '@/styles/pages/CollectionPage.module.scss';
import ratingIcon from '@/../public/icons/rating.svg';
import votesIcon from '../../../public/icons/userRank.svg';
import FilterSearch from '@/components/filters/FilterSearch';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { useRouter } from 'next/router';
/*import useSWR from 'swr';*/
import PostersList from '@/components/posters/PostersList/PostersList';
import { getCollection } from '../../utils/moviesHelpers';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import BorderedButton from '@/components/UI/buttons/BorderedButton/BorderedButton';
import SortMovies from '@/components/movie/SortMovies/SortMovies';
import { getAllStaticData } from '@/store/ActionCreators';
import axios from 'axios';
import IMovies from '@/models/IMovies';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const response = await axios.get('http://localhost:6125/filmswithinfo');
    const movies = response.data;

    return {
        props: {
            movies,
            ...(await serverSideTranslations(locale!, [
                'collection',
                'common',
                'footer',
                'header',
                'mainPage',
                'modals',
                'moviesPage',
                'movie',
            ])),
        },
    };
};

const Collection = ({ movies }: { movies: IMovies[] }) => {
    const { t } = useTranslation();
    const { asPath, locale } = useRouter();
    const dispatch = useAppDispatch();

    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [shownPostersLimit, setShownPostersLimit] = useState(35);

    const filteredList = useAppSelector((state) => state.movies.filteredMovies);

    useEffect(() => {
        setIsFilterApplied(filteredList.length !== 0);
    }, [filteredList]);

    useEffect(() => {
        dispatch(getAllStaticData());
    }, [locale]);

    const { genres, countries, actors, directors } = useAppSelector((state) => state.staticData);

    const countryNames =
        locale === 'ru'
            ? countries.map(({ name }: { name: string }) => name)
            : countries.map(({ enName }: { enName: string }) => enName);
    const countriesList = Array.from(new Set<string>(countryNames));

    const path = asPath.split('/').slice(-1)[0].split('-');
    const dynamicHeader =
        path.length === 1
            ? t(`mainPage:${path[0]}`)
            : t(`moviesPage:${path[0] + path[1][0].toUpperCase() + path[1].slice(1)}`);

    const collectionTitle = asPath.split('/').slice(-1)[0];
    const collection = getCollection(collectionTitle, movies, genres, countries);

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
                            <FilterRange category="ratingKp" image={ratingIcon} limit={10} step={0.1} />
                        </FilterPlank>

                        <FilterPlank
                            title={t('moviesPage:filterPanel.userRank')}
                            className={styles.container__filterItem}
                        >
                            <FilterRange category="votesKp" image={votesIcon} limit={1000000} step={100} />
                        </FilterPlank>

                        <FilterPlank
                            title={t('moviesPage:filterPanel.director')}
                            className={styles.container__filterItem}
                        >
                            <FilterSearch suggestionsList={directors} category="director" />
                        </FilterPlank>

                        <FilterPlank title={t('moviesPage:filterPanel.actor')} className={styles.container__filterItem}>
                            <FilterSearch suggestionsList={actors} category="actor" />
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
