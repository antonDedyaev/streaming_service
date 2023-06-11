import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VkUser } from './user.model';
import { CreateVkUserDto } from './dto/createVkUser.dto';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { RoleService } from '../role/role.service';
dotenv.config();

@Injectable()
export class VkontakteAuthService {
    constructor(@InjectModel(VkUser) private userRepo: typeof VkUser, private roleService: RoleService){}

    async createUser(userDto: CreateVkUserDto) {
        console.log("userDTO:");
        
        console.log(userDto);
        
        const candidate = await this.userRepo.findOne({where: {id : userDto.id}});
        if(candidate) {
            console.log("founded");
            
            const tokens = await this.generateTokens({name: candidate.name, roles: candidate.roles, id: candidate.id});
            candidate.refreshToken = tokens.refreshToken
            candidate.accessToken = tokens.accessToken
            await candidate.save()
            const candidateAfterFind = await this.userRepo.findOne({where: {id : userDto.id}, include: {all:true}});
            return {name: candidate.name, roles: candidateAfterFind.roles, accessToken: candidate.accessToken, refreshToken: candidate.refreshToken};
        }
        console.log('not founded');
        
        const user = await this.userRepo.create(userDto);
        const role = await this.roleService.getRoleByValue('user');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        const tokens = await this.generateTokens({name: user.name, roles: user.roles, id: user.id});
        user.refreshToken = tokens.refreshToken
        user.accessToken = tokens.accessToken
        await user.save()
        return {name: user.name, roles: user.roles, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken}
    }

    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }
    async getRefreshByAccess(token){
        const user = await this.userRepo.findOne({where:{accessToken:token}})
        return {refreshToken:user.refreshToken}
    }
    async validateAccessToken(accessToken: string) {
        try {
            const userData = await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            const { id } = userData;
            const user = await this.userRepo.findOne({where: { id: id}, include: {all:true}});
         return user;
        } catch(e) {
            return e;
        }
    }

    async refresh(refrershToken: string) {
        if (!refrershToken) {
            throw new UnauthorizedException();
        }

        const userData = await this.validateRefreshToken(refrershToken); 
        const user = await this.userRepo.findOne({where: {refreshToken: refrershToken}});
        if(!userData || !user) {
            throw new UnauthorizedException();
        }        
        const tokens = await this.generateTokens({name: user.name, roles: user.roles, id: user.id});
        user.refreshToken = tokens.refreshToken;

        return {...tokens};
    }

    async validateRefreshToken(token: string) {
        const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return userData;
    }

    async getUserById(userId: number) {
        const id = String(userId);
        const user = await this.userRepo.findOne({where: {id: id}, include: {all:true}});
        return user;
    }
}
