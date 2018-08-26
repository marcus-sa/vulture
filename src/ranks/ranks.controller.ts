import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { RanksService } from './ranks.service';
import { Ranks } from 'ranks/ranks.entity';

@ApiUseTags('ranks')
@Controller('ranks')
export class RanksController {
  constructor(
    private readonly ranksService: RanksService,
  ) {}

  @Get()
  async findAll(): Promise<Ranks[]> {
    return await this.ranksService.findAll();
  }
}
