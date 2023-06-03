import IMovies from '@/models/IMovies';
import styles from './PersonFilmographyList.module.scss';
import FilmographyItem from '../PersonFilmography/FilmographyItem';

interface PersonFilmographyListProps {
    movies: IMovies[];
}

const PersonFilmographyList = ({ movies }: PersonFilmographyListProps) => {
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

export default PersonFilmographyList;
