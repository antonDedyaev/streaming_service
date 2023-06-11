import { Table, Model, Column, DataType} from "sequelize-typescript";


interface GenresOfFilmsCreationAttr {
    id: number;
    movieid:number;
    genreid:number;
}

@Table({tableName: "genresOfFilms", createdAt: false, updatedAt: false})
export class GenresOfFilms extends Model<GenresOfFilms, GenresOfFilmsCreationAttr> {

    @Column({type: DataType.INTEGER,autoIncrement: true, unique: true, primaryKey: true})
    id: number;
    @Column({type: DataType.INTEGER})
    movieid:number;
    @Column({type: DataType.INTEGER})
    genreid:number;

}