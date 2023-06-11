import { Table, Model, Column, HasOne, DataType, BelongsToMany} from "sequelize-typescript";
import { Role } from "../role/role.model";
import { GoogleUserRoles } from "../role/googleUser-roles.model";

interface UserCreationAttr {
    id: string;
    email: string;
}

@Table({tableName: 'google_users'})
export class GoogleUser extends Model<GoogleUser, UserCreationAttr> {

    @Column({type: DataType.TEXT, unique: true, allowNull: false, primaryKey: true})
    id: string

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.TEXT})
    accessToken: string;

    @Column({type: DataType.TEXT})
    refreshToken: string; 

    @BelongsToMany(() => Role, () => GoogleUserRoles)
    roles: Role[]

}