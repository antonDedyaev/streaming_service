import { Controller, Get, Param, Req, Res, UseGuards, UnauthorizedException } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateGoogleUserDto } from './dto/createGoogleUser.dto';
import { ValidateGoogleToken } from './dto/validateGoogleToken.dto';
import * as jwt from 'jsonwebtoken';

@Controller('google')
export class GoogleAuthController {
    constructor(private googleService: GoogleAuthService) {}

    @MessagePattern('google.login')
    async googleAuthRedirect(@Payload() data: CreateGoogleUserDto) { 
        const user = await this.googleService.createUser(data); 
        return user;
    }

    @MessagePattern('validate.google.token')
    async validateToken(@Payload() data: any) {
        let tokens = data;
        const { refreshToken, accessToken } = data;
        let userData = await this.googleService.validateAccessToken(accessToken);
        if(userData instanceof Error) {
            if(userData instanceof jwt.TokenExpiredError) {
                const tokens = await this.googleService.refresh(refreshToken);
                userData = await this.googleService.validateAccessToken(tokens.accessToken);
                console.log('TOKENS HAS BEEN UPDATED');
            } else {
                return new UnauthorizedException();
            }
        }
        return {accessToken: tokens.accessToken || data.accessToken, 
            refreshToken: tokens.refrershToken || data.refreshToken, user: userData};
    }
    @MessagePattern({ cmd: 'get-refresh-by-access-google' })
    async getRefreshByAccess(
    @Ctx() context: RmqContext,
    @Payload() user: {accessToken:string}, ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.googleService.getRefreshByAccess(user.accessToken);
  
  }
}
