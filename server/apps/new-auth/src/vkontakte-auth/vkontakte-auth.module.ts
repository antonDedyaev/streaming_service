import { Module ,NestModule,MiddlewareConsumer} from '@nestjs/common';
import { VkontakteAuthController } from './vkontakte-auth.controller';
import { VkontakteAuthService } from './vkontakte-auth.service';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { VkUser } from './user.model';
import * as cookieParser from 'cookie-parser';
import { RoleModule } from '../role/role.module';

@Module({
  imports:[PassportModule.register({defaultStrategy: 'vkontakte'}), SequelizeModule.forFeature([VkUser]), RoleModule],
  controllers: [VkontakteAuthController],
  providers: [VkontakteAuthService]
})
export class VkontakteAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}
