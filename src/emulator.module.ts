import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class EmulatorModule {
  public static async forRoot(): Promise<DynamicModule> {
    const emulatorName = process.env.EMULATOR;
    const emulatorModule = (await import(`./${emulatorName}`)).default;

    return {
      module: EmulatorModule,
      exports: [emulatorModule],
      imports: [
        emulatorModule,
        TypeOrmModule.forRoot({
          type: 'mariadb',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          synchronize: true,
          entities: [__dirname + `/${emulatorName}/**/*.entity{.ts,.js}`],
          // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        }),
      ],
    };
  }
}
