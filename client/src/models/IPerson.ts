import IMovie from './IMovie';

export default interface IPerson {
    id: number;
    name: string;
    enName: string;
    photo: string;
    profession: string;
    enProfession: string;
    movies: IMovie[];
}
