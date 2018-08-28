import { Module } from '@nestjs/common';

import { RanksService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rank } from '../comet/ranks/ranks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rank])],
  providers: [RanksService],
  exports: [RanksService],
})
export class CommonModule {}
