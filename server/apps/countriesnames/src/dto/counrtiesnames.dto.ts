import { IsNumber, IsString } from "class-validator";

export class CountriesDto{
    @IsNumber({},{message:'Должно быть числом'})
    readonly id: number;
    @IsString({message: 'Должно быть строкой'})
    readonly name:string;
    @IsString({message: 'Должно быть строкой'})
    readonly enName:string;

}