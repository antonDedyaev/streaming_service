import { Controller, UnauthorizedException} from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { VkontakteAuthService } from './vkontakte-auth.service';
import { CreateVkUserDto } from './dto/createVkUser.dto';
import * as jwt from 'jsonwebtoken';

@Controller('vkontakte-auth')
export class VkontakteAuthController {
    constructor(private authService: VkontakteAuthService){}
    @MessagePattern('vkontakte.login')
    async vkAuthRedirect(@Payload() data: CreateVkUserDto) {
        const user = await this.authService.createUser(data);
        return user;
    }

    @MessagePattern('validate.vk.token')
    async validateToken(@Payload() data: any) {
       let tokens = data;
        const { refreshToken, accessToken } = data;
        let userData = await this.authService.validateAccessToken(accessToken);        
        if(userData instanceof Error) {
            if(userData instanceof jwt.TokenExpiredError) {
                const tokens = await this.authService.refresh(refreshToken);      
                userData = await this.authService.validateAccessToken(tokens.accessToken);
                console.log('TOKENS HAS BEEN UPDATED');
            } else {
                return new UnauthorizedException();
            }
        }
        return {accessToken: tokens.accessToken || data.accessToken, 
            refreshToken: tokens.refrershToken || data.refreshToken, user: userData};
    }
    @MessagePattern({ cmd: 'get-refresh-by-access-vk' })
    async getRefreshByAccess(
    @Ctx() context: RmqContext,
    @Payload() user: {accessToken:string}, ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.authService.getRefreshByAccess(user.accessToken);
  
  }
}
