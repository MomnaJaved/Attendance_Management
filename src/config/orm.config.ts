import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Momna292003.',
  database: 'nest-crud',
  autoLoadEntities: true,
  synchronize: true,
};
