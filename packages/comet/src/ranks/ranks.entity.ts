import { Column, Entity } from 'typeorm';

import { BaseRankEntity } from '@vulture/common';

@Entity('ranks')
export class Rank extends BaseRankEntity {
  @Column()
  readonly name!: string;

  @Column({ name: 'badgeid' })
  readonly badgeId!: string;

  @Column({ name: 'colour' })
  readonly color!: string;

  @Column({ name: 'staff_page' })
  readonly staffPage!: boolean;
}
