import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type Category =
  | 'identity'
  | 'explore'
  | 'music'
  | 'social'
  | 'games'
  | 'room_builder'
  | 'pets';

@Entity()
export class Achievements {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'group_name' })
  readonly groupName: string;

  @Column({
    default: 'identity',
    // enum: ['identity','explore','music','social','games','room_builder','pets'],
  })
  readonly category: Category;

  @Column()
  readonly level: number;

  @Column({ name: 'reward_activity_points' })
  readonly rewardActivityPoints: number;

  @Column({ name: 'reward_achievement_points' })
  readonly rewardAchievementPoints: number;

  @Column({ name: 'progress_requirement' })
  readonly progressRequirement: number;

  @Column()
  readonly enabled: boolean;
}
