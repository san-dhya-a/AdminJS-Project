import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { NoticiasCategory } from './noticias-category.entity.js';

@Entity({ name: 'noticias' })
export class Noticias extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => NoticiasCategory, (category) => category.noticias)
  @JoinTable({
    name: 'noticias_to_categories',
    joinColumn: { name: 'noticiasId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
  })
  categories: NoticiasCategory[];

  @Column({ type: 'longtext', nullable: true })
  image: string;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
