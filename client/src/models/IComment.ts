export default interface IComment {
    id: number;
    user: string;
    date: string;
    text: string;
    movieid: number;
    childComment?: IComment[];
    parentId?: number | null
}
