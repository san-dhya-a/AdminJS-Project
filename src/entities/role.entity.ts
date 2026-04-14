import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Relation, ManyToMany } from 'typeorm';
import { UserHasRoles } from './user-has-roles.entity.js';
import { User } from './user.entity.js';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: Relation<User>[];
}
