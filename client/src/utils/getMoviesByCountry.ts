import IMovies from '@/models/IMovies';

const getMoviesByCountry = (arrOfMovies: IMovies[], country: string) =>
    arrOfMovies.flatMap((movie) => {
        const filtered = movie.countries.filter((item) => item.name === country);
        return filtered.length === 0 ? [] : movie;
    });

export default getMoviesByCountry;
