import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ranks } from './ranks.entity';

@Injectable()
export class RanksService {
  constructor(
    @InjectRepository(Ranks)
    private readonly ranksRepository: Repository<Ranks>,
  ) {}

  async findAll(): Promise<Ranks[]> {
    return await this.ranksRepository.find();
  }
}
