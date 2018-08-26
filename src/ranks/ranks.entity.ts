import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Ranks {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiModelProperty()
  @Column()
  readonly name: string;

  @ApiModelProperty()
  @Column({ name: 'badgeid' })
  readonly badgeId: string;

  @ApiModelProperty()
  @Column({ name: 'colour' })
  readonly color: string;

  @ApiModelPropertyOptional()
  @Column({ name: 'staff_page' })
  readonly staffPage: boolean;
}
