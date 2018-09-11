import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { EmulatorModule } from './emulator.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [__dirname + `/${process.env.EMULATOR}/**/*.entity{.ts,.js}`],
      // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    }),
    EmulatorModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
