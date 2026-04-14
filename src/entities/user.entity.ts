import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, OneToMany, Relation } from 'typeorm';
import { UserHasRoles } from './user-has-roles.entity.js';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  role: string;

  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => UserHasRoles, (userHasRoles) => userHasRoles.user)
  userHasRoles: Relation<UserHasRoles>[];
}
