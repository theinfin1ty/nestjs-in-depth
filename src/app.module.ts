import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import entities from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CustomersModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'localhost',
      password: 'admin',
      database: 'nestjs_tutorial',
      entities: entities,
      synchronize: true,
    }),
    AuthModule,
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
