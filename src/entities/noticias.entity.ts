import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'noticias' })
export class Noticias extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column({ type: 'longtext', nullable: true })
  image: string;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({ nullable: true })
  title: string;
}
