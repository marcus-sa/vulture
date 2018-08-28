import { Column, Entity } from 'typeorm';

import { BaseRankEntity } from '../../common';

@Entity('ranks')
export class Rank {
  @Column()
  readonly name: string;

  @Column({ name: 'badgeid' })
  readonly badgeId: string;

  @Column({ name: 'colour' })
  readonly color: string;

  @Column({ name: 'staff_page' })
  readonly staffPage: boolean;
}
