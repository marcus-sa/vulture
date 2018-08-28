import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rank } from '../../comet/ranks/ranks.entity';
import { RankModel } from '../models';

@Injectable()
export class RanksService {
  constructor(
    @InjectRepository(Rank) private readonly ranksRepository: Repository<Rank>,
  ) {}

  async findAll(): Promise<RankModel[]> {
    return await this.ranksRepository.find();
  }

  async create(rank: RankModel): Promise<RankModel> {
    return await this.ranksRepository.create(rank);
  }
}
