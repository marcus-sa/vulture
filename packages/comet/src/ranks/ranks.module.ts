import { DynamicModule, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

import { RanksController } from './ranks.controller';
import { RanksService } from './ranks.service';
// import { Rank } from './ranks.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([Rank])],
  providers: [RanksService],
  controllers: [RanksController],
  // exports: [RanksService],
})
export class RanksModule {}
