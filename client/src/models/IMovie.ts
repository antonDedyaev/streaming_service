export default interface IMovie {
    id: number;
    type: string;
    name: string;
    enName: string;
    posterUrl: string;
    posterpreviewUrl: string;
    logo?: string;
    year: number;
    description: string;
    shortDescription: string;
    ageRating: number;
    ratingkp: number;
    votesKp: number;
    movieLength: number;
    genres: any[];
    countries: any[];
    persons: any[];
    place?: number;
    premiererussia: string;
    hasImax: boolean;
}
