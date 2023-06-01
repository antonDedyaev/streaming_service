import IMovies from './IMovies';

export default interface IPerson {
    id: number;
    name: string;
    enName: string;
    photo: string;
    profession: string[];
    enProfession: string[];
    countMovies?: number;
    movies?: IMovies[];
}
