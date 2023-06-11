import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";

import { Role } from "./role.model";
import { GoogleUser } from "../google-auth/user.model";

@Table({tableName: 'google_user_roles', createdAt: false, updatedAt: false})
export class GoogleUserRoles extends Model<GoogleUserRoles>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(() => GoogleUser)
    @Column({type: DataType.INTEGER})
    userId: number;
}