import IGenre from './IGenre';
import ICountry from './ICountry';

export default interface IMovies {
    id: number;
    name: string;
    enName: string;
    posterPreviewURL: string;
    premiereRussia: string;
    hasImax: boolean;
    year: number;
    ageRating: number;
    ratingKp: number;
    votesKp: number;
    movieLength: number;
    genres: IGenre[];
    countries: ICountry[];
}
