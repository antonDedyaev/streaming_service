import { IsString } from "class-validator";

export class CreateCountriesDto{
    @IsString({message: 'Должно быть строкой'})
    readonly name:string;
    @IsString({message: 'Должно быть строкой'})
    readonly enName:string;

}