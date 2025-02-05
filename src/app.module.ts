import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './roles/role.module';
import { UserModule } from './user/user.module';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Momna292003.',
      database: 'nest-crud',
      autoLoadEntities: true,
      synchronize: true,
    } as TypeOrmModuleOptions),
    RoleModule,
    UserModule,
  ],
})
export class AppModule {}
