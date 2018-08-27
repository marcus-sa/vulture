import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { EmulatorModule } from './emulator.module';

@Module({
  imports: [EmulatorModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
