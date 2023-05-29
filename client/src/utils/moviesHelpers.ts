import IGenre from '@/models/IGenre';
import IMovies from '@/models/IMovies';
import { ISortParams } from '@/components/movie/SortMovies/SortMovies';
import { addFilteredMovies } from '@/store/slices/moviesSlice';
import { AppDispatch } from '@/store/store';

export const getCollection = (title: string, movies: IMovies[], genres: IGenre[], countries: string[]) => {
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

export const getMovies = (arrOfMovies: IMovies[], value: string, genres: IGenre[], countries: string[]) => {
    if (Number(value)) {
        return arrOfMovies.filter((movie) => movie.year === Number(value));
    } else {
        if (genres.find((genre) => genre.enName === value)) {
            return getMoviesByGenreEn(arrOfMovies, value);
        } else if (countries.includes(value)) {
            return getMoviesByCountry(arrOfMovies, value);
        } else {
            return [];
        }
    }
};

export const getSortedMovies = (
    sortParams: ISortParams,
    sortingParameter: string,
    moviesToSort: IMovies[],
    locale: string,
    dispatch: AppDispatch,
) => {
    switch (sortingParameter) {
        case sortParams.userRates:
            moviesToSort.sort((a, b) => b.votesKp - a.votesKp);
            dispatch(addFilteredMovies(moviesToSort));
            break;
        case sortParams.rating:
            moviesToSort.sort((a, b) => b.ratingKp - a.ratingKp);
            dispatch(addFilteredMovies(moviesToSort));
            break;
        case sortParams.releaseDate:
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
        case sortParams.movieName:
            moviesToSort.sort((a, b) => {
                const firstArgName = a.enName && locale === 'en' ? a.enName : a.name;
                const secondArgName = b.enName && locale === 'en' ? b.enName : b.name;
                return firstArgName.toUpperCase() > secondArgName.toUpperCase()
                    ? 1
                    : secondArgName.toUpperCase() > firstArgName.toUpperCase()
                    ? -1
                    : 0;
            });
            dispatch(addFilteredMovies(moviesToSort));
            break;
        default:
            break;
    }
};
