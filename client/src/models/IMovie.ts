import IGenre from './IGenre';
import ICountry from './ICountry';
import IPerson from './IPerson';
import IComment from './IComment';

export default interface IMovie {
    id: number;
    type: string;
    name: string;
    enName: string;
    posterUrl: string;
    posterPreviewUrl: string;
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

    // permissions: string [] //Full HD, 4k, 1080 ...    |
    // subtitles: string[]				  | динамически или статически
    // voiceActing: string[]				  |

    watchingWithMovie: IMovie[];
    comments: IComment[];
}
