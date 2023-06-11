import { Controller, Post, Get, Body, Res, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService) {}

    @MessagePattern('create.user')
    async registration(@Payload() data) {
        const userData = await this.userService.registration(data);
        return userData;
    }

    @MessagePattern('validate.email.token')
    async validateAccessToken(data: any) {  
        let tokens = data;
        const { refreshToken, accessToken } = data;
        let userData = await this.userService.validateAccessToken(accessToken);
        if(userData instanceof Error) {
            if(userData instanceof jwt.TokenExpiredError) {
                const tokens = await this.userService.refresh(refreshToken);
                userData = await this.userService.validateAccessToken(tokens.accessToken);
                console.log('TOKENS HAS BEEN UPDATED');
            } else {
                return new UnauthorizedException();
            }
        }
        return {accessToken: tokens.accessToken || data.accessToken, 
            refreshToken: tokens.refrershToken || data.refreshToken, user: userData};
        
    }

    @MessagePattern('add.role.toUser')
    async addRole(@Payload() data) {
        const user = await this.userService.addRole(data);
        return user;
    }

    @MessagePattern('login.user')
    async login(@Payload() userDto) {
        const userData = await this.userService.login(userDto);
        return userData;
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const {refrershToken} = req.cookies;
        const token = await this.userService.logout(refrershToken);
        res.clearCookie('refrershToken');
        return token;
    }

    @Get('refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const {refrershToken} = req.cookies;
        const userData = await this.userService.refresh(refrershToken);
        res.cookie('refrershToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}).send(userData);
    }

    @MessagePattern({ cmd: 'get-refresh-by-access-email' })
    async getRefreshByAccess(
    @Ctx() context: RmqContext,
    @Payload() user: {accessToken:string}, ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.userService.getRefreshByAccess(user.accessToken);
  
  }
}