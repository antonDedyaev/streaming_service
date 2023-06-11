import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";

import { Role } from "./role.model";
import { VkUser } from "../vkontakte-auth/user.model";

@Table({tableName: 'vk_user_roles', createdAt: false, updatedAt: false})
export class VKUserRoles extends Model<VKUserRoles>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(() => VkUser)
    @Column({type: DataType.STRING})
    userId: string;
}