import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { NoticiasCategory } from './noticias-category.entity.js';

@Entity({ name: 'noticias' })
export class Noticias extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @ManyToMany(() => NoticiasCategory)
  @JoinTable({
    name: 'noticias_to_categories',
    joinColumn: { name: 'noticiasId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
  })
  categories: NoticiasCategory[];

  @Column({ type: 'longtext', nullable: true })
  image: string;

  @Column({ type: 'longtext', nullable: true, name: 'image1' })
  image1: string;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
