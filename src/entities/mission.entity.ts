import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'missions' })
export class Mission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['Diamantes', 'Points'], // The user might want Points too if they want English? But they specifically said "Diamantes / Pontos" earlier. I'll keep the values but change the technical label if needed. Actually, "Diamantes / Pontos" is fine.
    default: 'Diamantes',
  })
  rewardType: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  rewardValue: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  rewardLabel: string;

  @Column({ type: 'varchar', length: 100, default: 'Quero participar!' })
  buttonText: string;

  @Column({ type: 'date', nullable: true })
  startDate: string;

  @Column({ type: 'date', nullable: true })
  endDate: string;

  @Column({ type: 'datetime', nullable: true })
  publishDate: Date;

  @Column({ type: 'date', nullable: true })
  expireDate: string;

  @Column({ type: 'longtext', nullable: true })
  image: string;
}
