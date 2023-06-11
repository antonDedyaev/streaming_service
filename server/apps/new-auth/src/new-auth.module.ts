import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { VkontakteAuthModule } from './vkontakte-auth/vkontakte-auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { Token } from './user/token.model';
import { VkUser } from './vkontakte-auth/user.model';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.model';
import { UserRoles } from './role/user-roles.model';
import { GoogleUserModule } from './google-auth/google-auth.module';
import { GoogleUserRoles } from './role/googleUser-roles.model';
import { GoogleUser } from './google-auth/user.model';
import { VKUserRoles } from './role/vkUser-roles.model';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./apps/new-auth/.${process.env.NODE_ENV}.env`,
      isGlobal:true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User,Token, Role, UserRoles, GoogleUserRoles, GoogleUser, VkUser, VKUserRoles],
      autoLoadModels: true
    }),
    UserModule,
    VkontakteAuthModule,
    RoleModule,
    GoogleUserModule
    
  ],
  controllers: [],
  providers: [],
})
export class NewAuthModule {}
