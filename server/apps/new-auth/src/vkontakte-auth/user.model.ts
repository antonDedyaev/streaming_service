import { Table, Model, Column, HasOne, DataType, BelongsToMany} from "sequelize-typescript";
import { VKUserRoles } from "../role/vkUser-roles.model";
import { Role } from "../role/role.model";

interface UserCreationAttr {
    id: string;
    name: string;
}

@Table({tableName: 'vk_users'})
export class VkUser extends Model<VkUser, UserCreationAttr> {

    @Column({type: DataType.STRING, unique: true, allowNull: false, primaryKey: true})
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.TEXT})
    refreshToken: string;

    @Column({type: DataType.TEXT})
    accessToken: string; 

    @BelongsToMany(() => Role, () => VKUserRoles)
    roles: Role[]
} 