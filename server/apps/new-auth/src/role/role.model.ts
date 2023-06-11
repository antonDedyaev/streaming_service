import { Table, Column, DataType, Model, BelongsToMany } from "sequelize-typescript";
import { UserRoles } from "./user-roles.model";
import { User } from "../user/user.model";
import { GoogleUser } from "../google-auth/user.model";
import { GoogleUserRoles } from "./googleUser-roles.model";
import { VkUser } from "../vkontakte-auth/user.model";
import { VKUserRoles } from "./vkUser-roles.model";

interface RoleCreationAttrs {
    value: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;
    
    @BelongsToMany(() => User, () => UserRoles)
    users: User[];

    @BelongsToMany(() => GoogleUser, () => GoogleUserRoles)
    googleUsers: GoogleUser

    @BelongsToMany(() => VkUser, () => VKUserRoles)
    vkUsers: VkUser
}
