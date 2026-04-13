import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'noticias' })
export class Noticias extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  category: string;

  @Column({ type: 'longtext', nullable: true })
  image: string;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
