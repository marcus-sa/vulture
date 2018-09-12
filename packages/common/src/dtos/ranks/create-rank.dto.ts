import { IsString, IsBoolean, IsOptional } from 'class-validator';

import { RankModel } from '../../models';

export class CreateRankDto implements RankModel {
  @IsString()
  readonly name!: string;

  @IsString()
  readonly badgeId!: string;

  @IsOptional()
  @IsString()
  readonly color?: string;

  @IsOptional()
  @IsBoolean()
  readonly staffPage?: boolean;
}
