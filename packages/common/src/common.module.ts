import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RanksService } from './services';
import { RankToken } from './tokens';

@Module({
  imports: [TypeOrmModule.forFeature([RankToken])],
  providers: [RanksService],
  exports: [RanksService],
})
export class CommonModule {}
