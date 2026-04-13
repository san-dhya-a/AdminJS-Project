import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from 'typeorm';
import { Noticias } from './noticias.entity.js';

@Entity({ name: 'noti_category' })
export class NoticiasCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @ManyToMany(() => Noticias, (noticia) => noticia.categories)
  noticias: Noticias[];
}
