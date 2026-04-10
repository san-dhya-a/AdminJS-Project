import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { NoticiasCategory } from './noticias-category.entity.js';

@Entity({ name: 'noticias' })
export class Noticias extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NoticiasCategory, (category) => category.noticias, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: NoticiasCategory;

  @Column({ type: 'longtext', nullable: true })
  image: string;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
