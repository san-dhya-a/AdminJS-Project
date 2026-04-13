import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from 'typeorm';

@Entity({ name: 'home_banners' })
export class HomeBanner extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext', nullable: true }) // Using longtext for Base64 image support
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link: string;

  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: string;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
