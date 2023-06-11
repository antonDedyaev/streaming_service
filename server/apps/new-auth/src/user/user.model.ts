import { Table, Model, Column, HasOne, DataType, BelongsToMany} from "sequelize-typescript";
import { Token } from "./token.model";
import { Role } from "../role/role.model";
import { UserRoles } from "../role/user-roles.model";



interface UserCreationAttr {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, allowNull: false, primaryKey: true})
    userId: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasOne(() => Token)
    Tokens: Token;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}