import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import FilterList from '@/components/filters/FilterList';
import FilterPanel from '@/components/filters/FilterPanel';
import FilterPlank from '@/components/filters/FilterPlank';
import plankStyles from '@/components/filters/FilterPlank.module.scss';
import FilterRange from '@/components/filters/FilterRange';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';

import styles from '@/styles/pages/MoviesPage.module.scss';
import icon from '@/../public/icons/rating.svg';
import FilterSearch from '@/components/filters/FilterSearch';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { useRouter } from 'next/router';
/*import useSWR from 'swr';*/
import PostersList from '@/components/posters/PostersList/PostersList';
import { fetchMovies } from '@/store/slices/moviesSlice';
import getCollection from '../../utils/getCollection';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import BorderedButton from '@/components/UI/buttons/BorderedButton/BorderedButton';

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
    const [countriesList, setCountriesList] = useState<string[]>([]);
    const [genresList, setGenresList] = useState<string[]>([]);
    const [shownPostersLimit, setShownPostersLimit] = useState(35);

    useEffect(() => {
        dispatch(fetchMovies());

        const getCountries = async () => {
            try {
                const requestCountries = await axios.get('http://localhost:3000/api/countries');
                const countries = requestCountries.data.map(({ name }: { name: string }) => name);
                setCountriesList(countries.sort());
            } catch (err) {
                console.log(err);
            }
        };
        const getGenres = async () => {
            try {
                const requestGenres = await axios.get('http://localhost:3000/api/genres');
                const genres = requestGenres.data.map(({ name }: { name: string }) => name);
                setGenresList(genres.sort());
            } catch (err) {
                console.log(err);
            }
        };
        getCountries();
        getGenres();
    }, [locale]);

    const [filtersApplied, setFiltersApplied] = useState(false);

    const path = asPath.split('/').slice(-1)[0].split('-');
    const dynamicHeader =
        path.length === 1
            ? t(`mainPage:${path[0]}`)
            : t(`moviesPage:${path[0] + path[1][0].toUpperCase() + path[1].slice(1)}`);

    const movies = useAppSelector((state) => state.movies.movies);
    const collectionTitle = asPath.split('/').slice(-1)[0];
    const collection = getCollection(collectionTitle, movies, genresList, countriesList);

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
                    <FilterPanel>
                        <FilterPlank
                            title={t('moviesPage:filterPanel.genres')}
                            className={plankStyles.container__dropdown_leftPositioned}
                        >
                            <FilterList items={genresList} category={t('moviesPage:filterPanel.genres')} />
                        </FilterPlank>

                        <FilterPlank
                            title={t('moviesPage:filterPanel.countries')}
                            className={plankStyles.container__dropdown_centerPositioned}
                        >
                            <FilterList items={countriesList} category={t('moviesPage:filterPanel.countries')} />
                        </FilterPlank>

                        <FilterPlank
                            title={t('moviesPage:filterPanel.rating')}
                            className={styles.container__filterItem}
                        >
                            <FilterRange image={icon} limit={10} step={0.1} />
                        </FilterPlank>

                        <FilterPlank
                            title={t('moviesPage:filterPanel.userRank')}
                            className={styles.container__filterItem}
                        >
                            <FilterRange image={icon} limit={1000000} step={100} />
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
                            movies={collection!.slice(0, shownPostersLimit)}
                        ></PostersList>
                        {collection!.length > shownPostersLimit && (
                            <BorderedButton
                                size="large"
                                className={styles.container__paginationButton}
                                onClick={() => setShownPostersLimit(shownPostersLimit + 35)}
                            >
                                Показать еще
                            </BorderedButton>
                        )}
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default Collection;
