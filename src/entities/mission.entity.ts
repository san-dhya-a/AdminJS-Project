import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from 'typeorm';

@Entity({ name: 'missoes' })
export class Mission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'longtext', nullable: true }) // Using longtext for Base64 image support
  image: string;

  @Column({ name: 'reward_type', type: 'varchar', length: 100, nullable: true })
  rewardType: string;

  @Column({ name: 'reward_value', type: 'varchar', length: 100, nullable: true })
  rewardValue: string;

  @Column({ name: 'reward_label', type: 'varchar', length: 100, nullable: true })
  rewardLabel: string;

  @Column({ name: 'button_text', type: 'varchar', length: 100, default: 'Quero participar!' })
  buttonText: string;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: string;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: string;

  @Column({ name: 'publish_date', type: 'date', nullable: true })
  publishDate: string;

  @Column({ name: 'expire_date', type: 'date', nullable: true })
  expireDate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
