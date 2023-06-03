import IGenre from './IGenre';
import ICountry from './ICountry';
import IPerson from './IPerson';
import IComment from './IComment';
import IMovies from './IMovies';

export default interface IMovie {
    id: number;
    type: string;
    name: string | null;
    enName: string | null;
    posterUrl: string;
    posterPreviewURL: string;
    year: number;
    description: string;
    shortDescription: string;
    ageRating: number;
    ratingKp: number;
    votesKp: number;
    movieLength: number;
    genres: IGenre[];
    countries: ICountry[];
    persons: IPerson[];
    trailer: string;
    watchingWithMovie: IMovies[];
    comments: IComment[];
}
