import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './roles';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { ormConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    RoleModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
