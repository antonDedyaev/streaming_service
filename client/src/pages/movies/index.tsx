import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import FilterList from '@/components/filters/FilterList/FilterList';
import FilterPanel from '@/components/filters/FilterPanel/FilterPanel';
import FilterPlank from '@/components/filters/FilterPlank/FilterPlank';
import plankStyles from '@/components/filters/FilterPlank/FilterPlank.module.scss';
import FilterRange from '@/components/filters/FilterRange/FilterRange';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import MoviesSection from '@/components/sections/MoviesSection/MoviesSection';
import PersonsSection from '@/components/sections/PersonsSection/PersonsSection';
import styles from '@/styles/pages/MoviesPage.module.scss';
import ratingIcon from '@/../public/icons/rating.svg';
import votesIcon from '../../../public/icons/userRank.svg';
import FilterSearch from '@/components/filters/FilterSearch/FilterSearch';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { useRouter } from 'next/router';

import PostersList from '@/components/posters/PostersList/PostersList';
import BorderedButton from '@/components/UI/buttons/BorderedButton/BorderedButton';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import SortMovies from '@/components/movie/SortMovies/SortMovies';
import { getAllStaticData, getDataFromLocalStorage } from '@/store/ActionCreators';
import IMovies from '@/models/IMovies';
import { getDynamicUrl } from '@/utils/moviesHelpers';
import IFilters from '@/models/IFilters';


export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
            ])),
        },
    };
};

const MoviesPage = ({ movies }: { movies: IMovies[] }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { asPath, locale, basePath } = useRouter();

    const filteredList = useAppSelector((state) => state.movies.filteredMovies);

    useEffect(() => {
        setIsFilterApplied(filteredList.length !== 0);
    }, [filteredList]);

    const { genres, countries, actors, directors } = useAppSelector((state) => state.staticData);

    const countryNames =
        locale === 'ru'
            ? countries.map(({ name }: { name: string }) => name)
            : countries.map(({ enName }: { enName: string }) => enName);
    const countriesList = Array.from(new Set<string>(countryNames));

    const filteredActors = actors.filter((actor) => actor.name).sort((a, b) => b.countMovies! - a.countMovies!);

    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [shownPostersLimit, setShownPostersLimit] = useState(35);

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

    const allFilters: IFilters = useAppSelector((state) => state.movies.filters);

    const urlString = getDynamicUrl(allFilters);

    useEffect(() => {
        const urlTail = urlString.length !== 0 && 'filters' + urlString;
        history.pushState(
            null,
            'Filters',
            urlTail ? `http://localhost:3000${asPath}/${urlTail}` : `http://localhost:3000${asPath}`,
        );
    }, [urlString]);

    useEffect(() => {
        dispatch(getAllStaticData());
        dispatch(getDataFromLocalStorage());
    }, [locale, asPath, urlString]);

    const currentFilters = Object.entries(allFilters).filter(([, value]) => value.length !== 0 && value !== 0);
    const crumbs = currentFilters.map(([, value]) => value + ' ').join('/');

    const subHeaderFilters = currentFilters
        .flatMap(([key, value]) => {
            return key === 'votesKp' || key === 'ratingKp' ? `${t('collection:category.over')} ${value}` : value;
        })
        .join(', ');

    const headerFilters = currentFilters.flatMap(([key, value]) => {
        switch (key) {
            case 'genres':
                return value.length === 1 && `${t('collection:category.byGenre')}: ${value}`;
            case 'countries':
                return value.length === 1 && `${t('collection:category.byCountry')}: ${value}`;
            case 'ratingKp':
                return `${t('collection:category.byRating')}: ${value} ${t('collection:category.higher')}`;
            case 'votesKp':
                return `${t('collection:category.byVotes')}: ${value} ${t('collection:category.higher')}`;
            case 'actor':
                return `${t('collection:category.byActor')}: ${value}`;
            case 'director':
                return `${t('collection:category.byDirector')}: ${value}`;
            default:
                break;
        }
    });
    const header = headerFilters.length > 1 ? '' : headerFilters[0];

    return (
        <MainContainer
            keywords={['moviesPage', 'iviEtoKryto']}
            title="Смотреть фильмы онлайн бесплатно в хорошем HD качестве и без регистрации. Удобный просмотр онлайн фильмов на ivi.ru"
            page="other"
        >
            <div className="container">
                <div className={styles.container}>
                    <div className={styles.container__spoiler}>
                        <Breadcrumbs
                            path={(crumbs ? asPath + '/' + crumbs : asPath).split('/').slice(1)}
                            linked={false}
                        />

                        <h2 className={styles.container__title}>
                            {isFilterApplied && header
                                ? `${t('moviesPage:moviesSpoiler.sectionTitle')} ${header}`
                                : `${t('moviesPage:moviesSpoiler.sectionTitle')} ${t(
                                      'moviesPage:moviesSpoiler.header',
                                  )}`}
                        </h2>
                        {isFilterApplied && <span className={styles.container__subTitle}>{subHeaderFilters}</span>}
                        {!isFilterApplied && (
                            <SpoilerUI shownLines={2} toggleButtonTexts={[t('showSpoiler'), t('hideSpoiler')]}>
                                <p>{t('moviesPage:moviesSpoiler.content.0')}</p>
                                <p>{t('moviesPage:moviesSpoiler.content.1')}</p>
                                <p>{t('moviesPage:moviesSpoiler.content.2')}</p>
                                <p>{t('moviesPage:moviesSpoiler.content.3')}</p>
                                <p>{t('moviesPage:moviesSpoiler.content.4')}</p>
                            </SpoilerUI>
                        )}
                    </div>
                    <div className={styles.container__sortAndFilter}>
                        {isFilterApplied && <SortMovies filteredMovies={filteredList} />}
                        <FilterPanel isFilterApplied={isFilterApplied}>
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
                                <FilterList items={countriesList.sort()} category="countries" />
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

                            <FilterPlank
                                title={t('moviesPage:filterPanel.actor')}
                                className={styles.container__filterItem}
                            >
                                <FilterSearch suggestionsList={actors} category="actor" />
                            </FilterPlank>
                        </FilterPanel>
                    </div>

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
};

export default MoviesPage;
