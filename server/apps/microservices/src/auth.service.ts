import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateVkUserDto } from './dto/createVkUser.dto';
import { CreateUserDto } from './dto/createuser.dto';
import { CreateGoogleUserDto } from './dto/googleUser.dto';
import { ValidateToken } from './dto/validateGoogleToken.dto';

@Injectable()
export class AuthService {
    constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

    async createGoogleUser(userDto: CreateGoogleUserDto) {
        const user = await (this.client.send('google.login', {...userDto})).toPromise();
        return user;
    }

    async createVKUser(userDto: CreateVkUserDto) {
        const data = await (this.client.send('vkontakte.login', {...userDto})).toPromise().catch((error) => console.log(error));
        return data;
    }
    
    async registration(userDto: CreateUserDto) {
        const user = await (this.client.send('create.user', {...userDto})).toPromise();
        return user;
    }

    async login(userDto: CreateUserDto) {
        const user = await (this.client.send('login.user', {...userDto})).toPromise();
        return user;
    }

    async validateEmailToken(dto: ValidateToken) {
        const user = await (this.client.send('validate.email.token', {...dto})).toPromise();
        return user;
    }

    async validateGoogleToken(dto: ValidateToken) {
        const data = await (this.client.send('validate.google.token', {...dto})).toPromise();
        return data;
    }

    async validateVkToken(dto: ValidateToken) {
        const data = await (this.client.send('validate.vk.token',{...dto})).toPromise();
        return data;
    }

    async createAdmin() {
        const adminRole = await (this.client.send('create.role', {value: 'admin'})).toPromise();
        const userRole = await (this.client.send('create.role', {value: 'user'})).toPromise();
        const adminUser = await (this.client.send('create.user', {email: "admin@admin.com", password:"root"})).toPromise();
        const adminUserRoleUpdated = (await this.client.send('add.role.toUser', {email: "admin@admin.com", roleValue: "admin"})).toPromise();
        
        return adminUser;
    }
}
