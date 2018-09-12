import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRankEntity } from '../entities';
import { RankModel } from '../models';
import { RankToken } from '../tokens';

@Injectable()
export class RanksService {
  constructor(
    @InjectRepository(RankToken)
    private readonly ranksRepository: Repository<BaseRankEntity>,
  ) {}

  async findAll(): Promise<RankModel[]> {
    return await this.ranksRepository.find();
  }

  async create(rank: RankModel): Promise<RankModel> {
    return await this.ranksRepository.create(rank);
  }
}
