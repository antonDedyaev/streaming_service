import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType } from "sequelize-typescript";



interface FilmsCreationAttr {
    id:number;
    type:string;
    name:string;
    enName:string;
    posterUrl:string; 		
    posterPreviewURL:string;	
    premiereRussia:string; 		
    hasIMAX:boolean; 		
    year:number;
    description:string;
    shortDescription:string;
    ageRating:number;
    ratingKp:number;  		
    votesKp:number;   		
    movieLength:number;
}

@Table({tableName: "films", createdAt: false, updatedAt: false})
export class Films extends Model<Films, FilmsCreationAttr> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING})
    type:string;
    @Column({type: DataType.STRING})
    name:string;
    @Column({type: DataType.STRING})
    enName:string;
    @Column({type: DataType.STRING})
    posterUrl:string;
    @Column({type: DataType.STRING})
    posterPreviewURL:string;
    @Column({type: DataType.DATE})
    premiereRussia:string;
    @Column({type: DataType.BOOLEAN})
    hasIMAX :boolean;
    @Column({type: DataType.INTEGER})
    year:number;
    @Column({type: DataType.TEXT})
    description:string;
    @Column({type: DataType.STRING})
    shortDescription:string;
    @Column({type: DataType.INTEGER})
    ageRating:number;
    @Column({type: DataType.FLOAT})
    ratingKp: number;
    @Column({type: DataType.INTEGER})
    votesKp:number;
    @Column({type: DataType.INTEGER})
    movieLength:number;
    
   
}