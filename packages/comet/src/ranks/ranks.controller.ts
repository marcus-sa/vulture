import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateRankDto, BaseRanksController } from '@vulture/common';

export class RanksController extends BaseRanksController {
  @Get('/')
  async findAll() {
    return [];
  }

  /*@Post()
  async create(@Body() rank: CreateRankDto) {
    return await this.ranksService.create(rank);
  }*/
}
