import IActor from '../../../../../models/IActor';

export interface IMovie {
    id: number;
    title: string;
    year: number;
    ageLimit: string;
    time: string;
    production: string;
    genres: string[];
    displays: string[];
    voiceActing: string[];
    subtitles: string[];
    subtitlesFull: string[];
    description: string[];
    language: string[];
    raiting: number;
    nameraiting: string;
    actors: IActor[];
}
