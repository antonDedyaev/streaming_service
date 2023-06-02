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
        case 'Foreign':
            return getMoviesByForeign(movies);
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
        const filtered = movie.countries.filter((item) => item.enName === country);

        return filtered.length === 0 ? [] : movie;
    });

export const getMoviesByForeign = (arrOfMovies: IMovies[]) => {
    return arrOfMovies.flatMap((movie) => {
        let isCountry: boolean = false;
        movie.countries.forEach((item) => {
            if (item.enName === 'Russia' || item.enName === 'USSR') {
                isCountry = true;
            }
        });
        return isCountry ? [] : movie;
    });
};

export const getMovies = (arrOfMovies: IMovies[], value: string, genres: IGenre[], countries: ICountry[]) => {
    if (Number(value)) {
        return arrOfMovies.filter((movie) => movie.year === Number(value));
    } else {
        if (genres.find((genre) => genre.enName === value)) {
            return getMoviesByGenreEn(arrOfMovies, value);
        } else if (countries.find((country) => country.enName === value.split('_').join(' '))) {
            return getMoviesByCountry(arrOfMovies, value.split('_').join(' '));
        } else {
            return [];
        }
    }
};

export const getSortedMovies = (
    sortingParameter: string,
    moviesToSort: IMovies[],
    locale: string,
    dispatch: AppDispatch,
) => {
    switch (sortingParameter) {
        case 'userRates':
            moviesToSort.sort((a, b) => b.votesKp - a.votesKp);
            dispatch(addFilteredMovies(moviesToSort));
            break;
        case 'rating':
            moviesToSort.sort((a, b) => b.ratingKp - a.ratingKp);
            dispatch(addFilteredMovies(moviesToSort));
            break;
        case 'releaseDate':
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
        case 'name':
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
