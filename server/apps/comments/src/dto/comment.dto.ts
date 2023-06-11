import { isEmail } from "class-validator";

export class CreateCommentDto {
    readonly movieid: number;
    readonly user: string;
    readonly text: string;
    readonly date: string;
}