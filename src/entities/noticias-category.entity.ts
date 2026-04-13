import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Noticias } from './noticias.entity.js';

@Entity({ name: 'noti_category' })
export class NoticiasCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @OneToMany(() => Noticias, (noticia) => noticia.category)
  noticias: Noticias[];
}
