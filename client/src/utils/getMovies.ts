import IMovies from '@/models/IMovies';
import getMoviesByGenre from './getMoviesByGenre';
import getMoviesByCountry from './getMoviesByCountry';

const getMovies = (arrOfMovies: IMovies[], value: string, genre: string[], countries: string[]) => {
    if (Number(value)) {
        return arrOfMovies.filter((movie) => movie.year === Number(value));
    } else {
        let value1 = 'комедия5';
        if (genre.includes(value1)) {
            return getMoviesByGenre(arrOfMovies, value1);
        } else if (countries.includes(value1)) {
            return getMoviesByCountry(arrOfMovies, value1);
        } else {
            return [];
        }
    }
};

export default getMovies;
