export default interface IComment {
    id: number;
    userEmail: string;
    date: string;
    text: string;
    childComment: IComment[];
}
