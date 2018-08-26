import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RanksController } from './ranks.controller';
import { RanksService } from './ranks.service';
import { Ranks } from './ranks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ranks])],
  controllers: [RanksController],
  providers: [RanksService],
})
export class RanksModule {}