import { Module } from '@nestjs/common';

import { RanksService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankToken } from './tokens';

@Module({
  imports: [TypeOrmModule.forFeature([RankToken])],
  providers: [RanksService],
  exports: [RanksService],
})
export class CommonModule {}
