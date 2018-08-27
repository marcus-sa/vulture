import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiUseTags } from '@nestjs/swagger';

import { RanksService } from './ranks.service';
import { Ranks } from './ranks.entity';

@ApiUseTags('ranks')
@Controller('ranks')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @ApiOkResponse({
    description: 'Get all ranks available',
    type: 'object',
  })
  @Get('/')
  async findAll(): Promise<Ranks[]> {
    return await this.ranksService.findAll();
  }
}
