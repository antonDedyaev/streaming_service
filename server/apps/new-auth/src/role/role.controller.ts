import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @MessagePattern('create.role')
    async createRole(@Payload() data) {
        console.log(data.value);
        
        const role = await this.roleService.createRole(data.value);
        return role;
    }
}
