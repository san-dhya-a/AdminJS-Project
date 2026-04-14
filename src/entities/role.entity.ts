import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Relation } from 'typeorm';
import { UserHasRoles } from './user-has-roles.entity.js';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => UserHasRoles, (userHasRoles) => userHasRoles.role)
  userHasRoles: Relation<UserHasRoles>[];
}
