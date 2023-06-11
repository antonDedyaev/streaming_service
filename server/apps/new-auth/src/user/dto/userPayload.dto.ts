import { User } from "../user.model";

export class UserPayloadDto {
    userId: number;
    email: string;

    constructor(user: User) {
        this.userId = user.userId;
        this.email = user.email;
    }

}