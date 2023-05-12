import IMovie from '@/models/IMovie';
import styles from './ActorFilmographyList.module.scss';
import FilmographyItem from '../ActorFilmography/FilmographyItem';

interface ActorFilmographyListProps {
    movies: IMovie[];
}

const ActorFilmographyList = ({ movies }: ActorFilmographyListProps) => {
    return (
        <>
            {movies.map((movie) => (
                <div key={movie.name} className={styles.listItem}>
                    <FilmographyItem movie={movie} />
                </div>
            ))}
        </>
    );
};

export default ActorFilmographyList;
