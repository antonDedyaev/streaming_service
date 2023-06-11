import { Table, Model, Column, BelongsTo, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "./user.model";

interface TokenCreationAttr {
    accessToken:string;
    refreshToken: string;
    userId: number;
}

@Table({tableName: 'tokens'})
export class Token extends Model<Token, TokenCreationAttr> {

    @Column({type: DataType.STRING, allowNull: false})
    accessToken: string;

    @Column({type: DataType.STRING, allowNull: false})
    refreshToken: string;

    @BelongsTo(() => User)
    user: User; 

    @ForeignKey(() => User)
    userId: number;
}   