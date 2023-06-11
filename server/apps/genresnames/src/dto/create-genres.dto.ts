import { IsString } from "class-validator";

export class CreateGenresNamesDto{

    @IsString({message: 'Должно быть строкой'})
    readonly name:string;
    @IsString({message: 'Должно быть строкой'})
    readonly enName:string;
    
}