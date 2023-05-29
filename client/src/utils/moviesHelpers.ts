import ICountry from '@/models/ICountry';
import IGenre from '@/models/IGenre';
import IMovies from '@/models/IMovies';
import { addFilteredMovies } from '@/store/slices/moviesSlice';
import { AppDispatch } from '@/store/store';

export const getCollection = (title: string, movies: IMovies[], genres: IGenre[], countries: ICountry[]) => {
    switch (title) {
        case 'new-releases':
            return movies
                .filter((movie) => movie.premiereRussia)
                .sort(
                    (a, b) =>
                        new Date(
                            new Date(b.premiereRussia) < new Date(String(b.year)) ? b.premiereRussia : b.year,
                        ).getTime() -
                        new Date(
                            new Date(a.premiereRussia) < new Date(String(a.year)) ? a.premiereRussia : a.year,
                        ).getTime(),
                );
        case 'best-movies':
            return movies.filter((movie) => movie.ratingKp).sort((a, b) => b.ratingKp - a.ratingKp);
        case 'imax-movies':
            return movies
                .filter((movie) => movie.hasIMAX)
                .sort((a, b) => new Date(b.premiereRussia).getTime() - new Date(a.premiereRussia).getTime());
        case 'fantasy':
            return getMoviesByGenre(movies, 'фантастика');
        case 'drama':
            return getMoviesByGenre(movies, 'драма');
        default:
            return getMovies(movies, title, genres, countries);
    }
};

export const getMoviesByGenre = (arrOfMovies: IMovies[], genre: string) =>
    arrOfMovies.flatMap((movie) => {
        const filtered = movie.genres.filter((item) => item.name === genre);
        return filtered.length === 0 ? [] : movie;
    });

export const getMoviesByGenreEn = (arrOfMovies: IMovies[], genre: string) =>
    arrOfMovies.flatMap((movie) => {
        const filtered = movie.genres.filter((item) => item.enName === genre);
        return filtered.length === 0 ? [] : movie;
    });

export const getMoviesByCountry = (arrOfMovies: IMovies[], country: string) =>
    arrOfMovies.flatMap((movie) => {
        const filtered = movie.countries.filter((item) => item.name === country);
        return filtered.length === 0 ? [] : movie;
    });

export const getMovies = (arrOfMovies: IMovies[], value: string, genres: IGenre[], countries: ICountry[]) => {
    if (Number(value)) {
        return arrOfMovies.filter((movie) => movie.year === Number(value));
    } else {
        if (genres.find((gener) => gener.enName === value)) {
            return getMoviesByGenreEn(arrOfMovies, value);
        } else if (countries.find((gener) => gener.enName === value)) {
            return getMoviesByCountry(arrOfMovies, value);
        } else {
            return [];
        }
    }
};

export const getSortedMovies = (sortingParameter: string, moviesToSort: IMovies[], dispatch: AppDispatch) => {
    switch (sortingParameter) {
        case 'По количеству оценок':
            moviesToSort.sort((a, b) => b.votesKp - a.votesKp);
            dispatch(addFilteredMovies(moviesToSort));
            break;
        case 'Рейтингу':
            moviesToSort.sort((a, b) => b.ratingKp - a.ratingKp);
            dispatch(addFilteredMovies(moviesToSort));
            break;
        case 'Дате выхода':
            moviesToSort.sort(
                (a, b) =>
                    new Date(
                        new Date(b.premiereRussia) < new Date(String(b.year)) ? b.premiereRussia : b.year,
                    ).getTime() -
                    new Date(
                        new Date(a.premiereRussia) < new Date(String(a.year)) ? a.premiereRussia : a.year,
                    ).getTime(),
            );
            dispatch(addFilteredMovies(moviesToSort));
            break;
        case 'Алфавиту':
            moviesToSort.sort((a, b) => {
                return a.name.toUpperCase() > b.name.toUpperCase()
                    ? 1
                    : b.name.toUpperCase() > a.name.toUpperCase()
                    ? -1
                    : 0;
            });
            dispatch(addFilteredMovies(moviesToSort));
            break;
        default:
            break;
    }
};
