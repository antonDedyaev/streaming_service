import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType, BelongsToMany} from "sequelize-typescript";


interface CountriesNamesCreationAttr {
    id: number;
    name:string; 
    enName:string; 
}

@Table({tableName: "countriesNames", createdAt: false, updatedAt: false})
export class CountriesNames extends Model<CountriesNames, CountriesNamesCreationAttr> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER,autoIncrement: true, unique: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING})
    name:string; 
    @Column({type: DataType.STRING})
    enName:string; 

}