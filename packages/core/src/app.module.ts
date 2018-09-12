import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { EmulatorModule } from './emulator.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: <any>process.env.DB_TYPE,
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
