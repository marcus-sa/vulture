import { Module } from '@nestjs/common';

import { RanksModule } from './ranks';

@Module({
  imports: [RanksModule],
  exports: [RanksModule],
})
export default class CometModule {}
