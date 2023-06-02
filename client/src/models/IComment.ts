export default interface IComment {
    id: number;
    user: string;
    date: string;
    text: string;
    childComment?: IComment[];
}
