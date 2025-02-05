import { Module } from '@nestjs/common';
import { UserService, LoginService, RegisterService } from './user.service';
import {
  UserController,
  LoginController,
  RegisterController,
} from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, LoginController, RegisterController],
  providers: [UserService, LoginService, RegisterService],
})
export class UserModule {}
