import IMovies from '@/models/IMovies';
import styles from './FilmographySection.module.scss';
import { declineWord } from '@/utils/functions';
import ActorFilmographyList from '@/components/actor/ActorFilmographyList/ActorFilmographyList';
import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';
import { useTranslation } from 'react-i18next';

interface FilmographySectionProps {
    movies: IMovies[];
}

const FilmographySection = ({ movies }: FilmographySectionProps) => {
    const { t } = useTranslation(['person', 'moviesPage']);

    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                <h2 className={styles.section__title}>{t('title')}</h2>
                <p className={styles.section__amount}>
                    {`${movies.length} ${declineWord(movies.length, [
                        t('filmography.singleMovie', { ns: 'moviesPage' }),
                        t('filmography.fewMovies', { ns: 'moviesPage' }),
                        t('filmography.manyMovies', { ns: 'moviesPage' }),
                    ])}`}
                </p>
            </div>

            <div className={styles.section__content}>
                <div className={styles.section__contentList}>
                    <ActorFilmographyList movies={movies.slice(0, 8)} />
                </div>

                {movies.length > 8 && (
                    <SpoilerUI
                        toggleButtonTexts={[
                            `${t('more')} ${movies.length - 8} ${declineWord(movies.length - 8, [
                                t('filmography.singleMovie', { ns: 'moviesPage' }),
                                t('filmography.fewMovies', { ns: 'moviesPage' }),
                                t('filmography.manyMovies', { ns: 'moviesPage' }),
                            ])}`,
                            '',
                        ]}
                        shownLines={0}
                        buttonTextColor="faded"
                    >
                        <div className={styles.section__contentList}>
                            <ActorFilmographyList movies={movies.slice(8)} />
                        </div>
                    </SpoilerUI>
                )}
            </div>
        </div>
    );
};

export default FilmographySection;
