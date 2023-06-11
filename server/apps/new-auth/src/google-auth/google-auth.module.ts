import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { GoogleUser } from './user.model';
import * as cookieParser from 'cookie-parser';import { RoleModule } from '../role/role.module';
;

@Module({
    imports: [SequelizeModule.forFeature([GoogleUser]), RoleModule],
    controllers: [GoogleAuthController],
    providers: [GoogleAuthService]
})
export class GoogleUserModule{}