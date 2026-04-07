import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('pages')
export class Page extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subtitle: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ['faq', 'regulamento'],
    default: 'faq',
  })
  pageType: 'faq' | 'regulamento';

  @Column({ type: 'json', nullable: true })
  content: any;
}
