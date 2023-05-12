import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import FilterList from '@/components/filters/FilterList';
import FilterPanel from '@/components/filters/FilterPanel';
import FilterPlank from '@/components/filters/FilterPlank';
import plankStyles from '@/components/filters/FilterPlank.module.scss';
import FilterRange from '@/components/filters/FilterRange';
import { countries, genres } from '@/components/filters/temp/items';
import MainContainer from '@/components/main_container/MainContainer/MainContainer';
import { ratingMovies } from '@/components/posters/RatingPoster/ratingMovies.data';
import MoviesSection from '@/components/sections/MoviesSection/MoviesSection';
import PersonsSection from '@/components/sections/PersonsSection/PersonsSection';
import styles from '@/styles/pages/MoviesPage.module.scss';
import icon from '@/../public/icons/rating.svg';
import FilterSearch from '@/components/filters/FilterSearch';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common', 'footer', 'header', 'moviesPage', 'modals'])),
    },
});

function MoviesPage() {
    const { t } = useTranslation();
    return (
        <MainContainer
            keywords={['homePage', 'iviEtoKryto']}
            title="Смотреть фильмы онлайн бесплатно в хорошем HD качестве и без регистрации. Удобный просмотр онлайн фильмов на ivi.ru"
            page="home"
        >
            <div className="container">
                <div className={styles.container}>
                    <div className={styles.container__spoiler}>
                        <h1 className={styles.container__crumbs}>Хлебные/крошки</h1>

                        <h2 className={styles.container__title}>{t('moviesPage:moviesSpoiler.header')}</h2>
                        <SpoilerUI shownLines={2} toggleButtonTexts={[t('showSpoiler'), t('hideSpoiler')]}>
                            <p>{t('moviesPage:moviesSpoiler.content.0')}</p>
                            <p>{t('moviesPage:moviesSpoiler.content.1')}</p>
                            <p>{t('moviesPage:moviesSpoiler.content.2')}</p>
                            <p>{t('moviesPage:moviesSpoiler.content.3')}</p>
                            <p>{t('moviesPage:moviesSpoiler.content.4')}</p>
                        </SpoilerUI>
                    </div>

                    <FilterPanel>
                        <FilterPlank
                            title={t('moviesPage:filterPanel.genres')}
                            className={plankStyles.container__dropdown_leftPositioned}
                        >
                            <FilterList items={genres} />
                        </FilterPlank>

                        <FilterPlank
                            title={t('moviesPage:filterPanel.countries')}
                            className={plankStyles.container__dropdown_centerPositioned}
                        >
                            <FilterList items={countries} />
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
                            <FilterSearch searchBy="Режиссёр" />
                        </FilterPlank>

                        <FilterPlank title={t('moviesPage:filterPanel.actor')} className={styles.container__filterItem}>
                            <FilterSearch searchBy="Актёр" />
                        </FilterPlank>
                    </FilterPanel>

                    <div className={styles.container__section}>
                        <MoviesSection title={t('moviesPage:releases')} movies={ratingMovies} href="/" />
                    </div>

                    <div className={styles.container__section}>
                        <MoviesSection title={t('moviesPage:topMovies')} movies={ratingMovies} href="/" />
                    </div>

                    <div className={styles.container__section}>
                        <PersonsSection size="large" persons={actors} />
                    </div>

                    <div className={styles.container__section}>
                        <MoviesSection title={t('moviesPage:UHDmovies')} movies={ratingMovies} href="/" />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
}

export default MoviesPage;
