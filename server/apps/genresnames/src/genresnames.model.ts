import { Table, Model, Column, DataType} from "sequelize-typescript";


interface namesGenresOfFilmsCreationAttr {
    id: number;
    name:string;
    enName:string;
}

@Table({tableName: "namesgenresOfFilms", createdAt: false, updatedAt: false})
export class namesGenresOfFilms extends Model<namesGenresOfFilms, namesGenresOfFilmsCreationAttr> {

    @Column({type: DataType.INTEGER,autoIncrement: true, unique: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING})
    name:string;
    @Column({type: DataType.STRING})
    enName:string;
    
}