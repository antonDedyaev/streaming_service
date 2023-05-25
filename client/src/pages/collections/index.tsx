// import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
// import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
// import FilterList from '@/components/filters/FilterList';
// import FilterPanel from '@/components/filters/FilterPanel';
// import FilterPlank from '@/components/filters/FilterPlank';
// import plankStyles from '@/components/filters/FilterPlank.module.scss';
// import FilterRange from '@/components/filters/FilterRange';
// import MainContainer from '@/components/main_container/MainContainer/MainContainer';
// import MoviesSection from '@/components/sections/MoviesSection/MoviesSection';
// import PersonsSection from '@/components/sections/PersonsSection/PersonsSection';
// import styles from '@/styles/pages/MoviesPage.module.scss';
// import icon from '@/../public/icons/rating.svg';
// import FilterSearch from '@/components/filters/FilterSearch';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { useTranslation } from 'next-i18next';
// import { GetServerSideProps } from 'next';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
// import { useRouter } from 'next/router';
// import useSWR from 'swr';
// import { fetchMovies } from '@/store/slices/moviesSlice';
// import IActor from '@/models/IActor';
// import { fetchActors } from '@/store/slices/actorsSlice';
// import PostersList from '@/components/posters/PostersList/PostersList';

// export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
//     props: {
//         ...(await serverSideTranslations(locale!, ['common', 'footer', 'header', 'moviesPage', 'modals'])),
//     },
// });

// // const swr = (url: string) => {
// //     const { data, error } = useSWR(url, async () => await axios.get(url).then((res) => res.data));
// //     return data;
// // };

// function CollectionsPage() {
//     // const address = 'http://localhost:6125/filmswithinfo';
//     // const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);
//     // const { data, error } = useSWR(address, fetcher);

//     const { t } = useTranslation();
//     const dispatch = useAppDispatch();
//     const { locale } = useRouter();
//     const [countriesList, setCountriesList] = useState<string[]>([]);
//     const [genresList, setGenresList] = useState<string[]>([]);

//     const [filtersApplied, setFiltersApplied] = useState(false);

//     const movies = useAppSelector((state) => state.movies.movies);
//     const celebrities = useAppSelector((state) => state.actors.actors);
//     const actors = celebrities.filter((celeb) => celeb.photo && celeb.profession === 'актеры');

//     const premieres = movies
//         .filter((movie) => movie.premiereRussia)
//         .sort((a, b) => new Date(b.premiereRussia).getTime() - new Date(a.premiereRussia).getTime());
//     const bestMovies = movies
//         .filter((movie) => movie.ratingKp)
//         .sort((a, b) => b.ratingKp - a.ratingKp)
//         .slice(0, 18);

//     const imaxMovies = movies
//         .filter((movie) => movie.hasImax)
//         .sort((a, b) => new Date(b.premiereRussia).getTime() - new Date(a.premiereRussia).getTime())
//         .slice(0, 18);

//     useEffect(() => {
//         dispatch(fetchMovies());
//         dispatch(fetchActors());
//         //dispatch(moviesAdded(data));

//         const getCountries = async () => {
//             try {
//                 const uniqieCountries = new Set<string>();
//                 const requestCountries = await axios.get('http://localhost:6125/countriesOffilm');
//                 requestCountries.data.forEach(({ country }: { country: string }) => uniqieCountries.add(country));
//                 setCountriesList([...uniqieCountries].sort());
//             } catch (err) {
//                 console.log(err);
//             }
//         };
//         const getGenres = async () => {
//             try {
//                 const requestGenres = await axios.get('http://localhost:6125/namesgenres');
//                 const genres = requestGenres.data.map(({ genre }: { genre: string }) => genre);
//                 setGenresList(genres.sort());
//             } catch (err) {
//                 console.log(err);
//             }
//         };

//         getCountries();
//         getGenres();
//     }, [locale]);

//     return (
//         <MainContainer
//             keywords={['homePage', 'iviEtoKryto']}
//             title="Смотреть фильмы онлайн бесплатно в хорошем HD качестве и без регистрации. Удобный просмотр онлайн фильмов на ivi.ru"
//             page="home"
//         >
//             <div className="container">
//                 <div className={styles.container}>
//                     <div className={styles.container__spoiler}>
//                         <h1 className={styles.container__crumbs}>Хлебные/крошки</h1>

//                         <h2 className={styles.container__title}>{t('moviesPage:moviesSpoiler.header')}</h2>
//                         <SpoilerUI shownLines={2} toggleButtonTexts={[t('showSpoiler'), t('hideSpoiler')]}>
//                             <p>{t('moviesPage:moviesSpoiler.content.0')}</p>
//                             <p>{t('moviesPage:moviesSpoiler.content.1')}</p>
//                             <p>{t('moviesPage:moviesSpoiler.content.2')}</p>
//                             <p>{t('moviesPage:moviesSpoiler.content.3')}</p>
//                             <p>{t('moviesPage:moviesSpoiler.content.4')}</p>
//                         </SpoilerUI>
//                     </div>
//                     <FilterPanel>
//                         <FilterPlank
//                             title={t('moviesPage:filterPanel.genres')}
//                             className={plankStyles.container__dropdown_leftPositioned}
//                         >
//                             <FilterList items={genresList} category={t('moviesPage:filterPanel.genres')} />
//                         </FilterPlank>

//                         <FilterPlank
//                             title={t('moviesPage:filterPanel.countries')}
//                             className={plankStyles.container__dropdown_centerPositioned}
//                         >
//                             <FilterList items={countriesList} category={t('moviesPage:filterPanel.countries')} />
//                         </FilterPlank>

//                         <FilterPlank
//                             title={t('moviesPage:filterPanel.rating')}
//                             className={styles.container__filterItem}
//                         >
//                             <FilterRange image={icon} limit={10} step={0.1} />
//                         </FilterPlank>

//                         <FilterPlank
//                             title={t('moviesPage:filterPanel.userRank')}
//                             className={styles.container__filterItem}
//                         >
//                             <FilterRange image={icon} limit={1000000} step={100} />
//                         </FilterPlank>

//                         <FilterPlank
//                             title={t('moviesPage:filterPanel.director')}
//                             className={styles.container__filterItem}
//                         >
//                             <FilterSearch searchBy="Режиссёр" />
//                         </FilterPlank>

//                         <FilterPlank title={t('moviesPage:filterPanel.actor')} className={styles.container__filterItem}>
//                             <FilterSearch searchBy="Актёр" />
//                         </FilterPlank>
//                     </FilterPanel>
//                     {!filtersApplied && (
//                         <>
//                             <div className={styles.container__section}>
//                                 <MoviesSection
//                                     title={t('moviesPage:releases')}
//                                     movies={premieres.slice(0, 18)}
//                                     href="/"
//                                 />
//                             </div>

//                             <div className={styles.container__section}>
//                                 <MoviesSection title={t('moviesPage:topMovies')} movies={bestMovies} href="/" />
//                             </div>
//                             <div className={styles.container__section}>
//                                 <PersonsSection size="large" persons={actors} />
//                             </div>
//                             <div className={styles.container__section}>
//                                 <MoviesSection title={t('moviesPage:imaxMovies')} movies={imaxMovies} href="/" />
//                             </div>
//                         </>
//                     )}
//                     <div className={styles.list}>
//                         <PostersList posterType="preview" movies={premieres}></PostersList>
//                     </div>
//                 </div>
//             </div>
//         </MainContainer>
//     );
// }

// export default CollectionsPage;
