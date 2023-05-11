import IMovie from '@/models/IMovie';
import styles from './FilmographySection.module.scss';
import { declineWord } from '@/utils/functions';
import ActorFilmographyList from '@/components/actor/ActorFilmographyList/ActorFilmographyList';
import SpoilerUI from '@/components/UI/Spoiler/SpoilerUI';

interface FilmographySectionProps {
    movies: IMovie[];
}

const FilmographySection = ({ movies }: FilmographySectionProps) => {
    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                <h2 className={styles.section__title}>Полная фильмография</h2>
                <p className={styles.section__amount}>
                    {`${movies.length} ${declineWord(movies.length, ['фильм', 'фильма', 'фильмов'])}`}
                </p>
            </div>

            <div className={styles.section__content}>
                <div className={styles.section__contentList}>
                    <ActorFilmographyList movies={movies.slice(0, 8)} />
                </div>

                {movies.length > 8 && (
                    <SpoilerUI
                        toggleButtonTexts={[
                            `Ещё ${movies.length - 8} ${declineWord(movies.length - 8, [
                                'фильм',
                                'фильма',
                                'фильмов',
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
