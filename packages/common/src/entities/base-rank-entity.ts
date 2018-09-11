import { PrimaryGeneratedColumn } from 'typeorm';

import { RankModel } from '../models';

export abstract class BaseRankEntity implements RankModel {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  abstract readonly name: string;
  abstract readonly badgeId: string;
}
