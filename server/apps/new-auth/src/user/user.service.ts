import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Token } from './token.model';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserPayloadDto } from './dto/userPayload.dto';
import { RoleService } from '../role/role.service';
import { AddRoleDto } from './dto/addRole.dto';
dotenv.config();

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepo: typeof User,
    @InjectModel(Token) private tokenRepo: typeof Token,
    private roleService: RoleService){}
    async registration(createUserDto: CreateUserDto) {
        const candidate = await this.userRepo.findOne({where: {email : createUserDto.email}});
        if(candidate) {
             throw new Error('Пользователь с таким почтовым адрссом уже существует!')
        }
 
        const hashedPassword = await bcrypt.hash(createUserDto.password, 3);
        const user = await this.userRepo.create({password: hashedPassword, email: createUserDto.email});
 
        const role = await this.roleService.getRoleByValue('user');
        await user.$set('roles', [role.id]);
        user.roles = [role];

        const userPayloadDto = new UserPayloadDto(user);
        const tokens = await this.generateTokens({...userPayloadDto});
        await this.saveToken(userPayloadDto.userId, tokens.refreshToken,tokens.accessToken);
        
        const userWithRoles = await this.userRepo.findOne({where: {email : user.email}, include: {all:true}});
        return {user: userWithRoles, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken};
     }
 
     async login(createUserDto: CreateUserDto) {
        const user = await this.userRepo.findOne({where: {email: createUserDto.email}, include: {all:true}});
        if(!user) {
             throw new Error('Пользователь с такой почтой не найден');
        }     
        const passwordEquals = await bcrypt.compare(createUserDto.password, user.password);
        if(!passwordEquals) {
             throw new Error('Неверный пороль');
        }
        const userPayloadDto = new UserPayloadDto(user);
        const tokens = await this.generateTokens({...userPayloadDto});
        await this.saveToken(userPayloadDto.userId, tokens.refreshToken,tokens.accessToken);
        
        return {user: user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken};
     }
 
     async logout(refrershToken: string) {
         const token = await this.tokenRepo.findOne({where: {refreshToken: refrershToken}});
         await token.destroy();
         return token;
     }
     async getRefreshByAccess(token){
        const user = await this.tokenRepo.findOne({where:{accessToken:token}})
        return {refreshToken:user.refreshToken}
    }
     async refresh(refrershToken: string) {
         if (!refrershToken) {
             throw new UnauthorizedException();
         }
 
         const userData = await this.validateRefreshToken(refrershToken); 
         const tokenFromDB = await this.tokenRepo.findOne({where: {refreshToken: refrershToken}});
         if(!userData || !tokenFromDB) {
             throw new UnauthorizedException();
         }        
         const user = await this.userRepo.findOne({include: {all: true},  where: {'$refreshToken.refreshToken$': refrershToken}});
         const userPayloadDto = new UserPayloadDto(user);
 
         const tokens = await this.generateTokens({...userPayloadDto});
         await this.saveToken(userPayloadDto.userId, tokens.refreshToken,tokens.accessToken);
 
         return {...tokens};
     }
 
     async getAllUsers() {
         return await this.userRepo.findAll();
     }
     
 
     async validateAccessToken(token: string) {
         try {
                const userData = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);
                const { email } = userData;
                const user = await this.userRepo.findOne({where: { email: email}, include: {all:true}});
             return user;
         } catch(e) {
             return e;
         }
     }
 
     async validateRefreshToken(token: string) {
         const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
         return userData;
     }
 
    async generateTokens(payload: UserPayloadDto) {
         const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
         const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
         return {
             accessToken,
             refreshToken
         }
     }
 
     async saveToken(userId: number, refreshToken: string,accessToken:string) {
         const tokenData = await this.tokenRepo.findOne({where: {userId: userId}});
         if(tokenData) {
             tokenData.refreshToken = refreshToken;
             tokenData.accessToken = accessToken;
             return tokenData.save();
         }
 
         const token = await this.tokenRepo.create({refreshToken: refreshToken, userId: userId,accessToken:accessToken}); 
         return token;
     }

     async addRole(dto: AddRoleDto) {
        console.log(dto);
        
        const role = await this.roleService.getRoleByValue(dto.roleValue);
        const user = await this.userRepo.findOne({where: {email: dto.email}});
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
     }
}
