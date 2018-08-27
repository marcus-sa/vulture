import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RanksModule } from './ranks';
import { AppController } from './app.controller';

@Module({
  imports: [
    RanksModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
