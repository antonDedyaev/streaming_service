import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

    async createRole(value: string) {
        const role = await this.roleRepo.create({value: value});
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepo.findOne({where: {value}});
        return role;
    }

    async getRoles() {
        const roles = await this.roleRepo.findAll({include: {all:true}});
        return roles;
    }
}
