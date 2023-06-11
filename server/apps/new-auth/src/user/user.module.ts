import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Token } from './token.model';
import { AuthController } from './auth.controller';
import { RoleModule } from '../role/role.module';

@Module({
  imports:[SequelizeModule.forFeature([User, Token]), RoleModule],
  controllers: [AuthController],
  providers: [UserService]
})
export class UserModule {}
