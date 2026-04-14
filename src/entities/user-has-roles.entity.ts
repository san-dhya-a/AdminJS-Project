import { Entity, BaseEntity, ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn, Relation, Unique } from 'typeorm';
import { User } from './user.entity.js';
import { Role } from './role.entity.js';

@Entity({ name: 'user_has_roles' })
@Unique(['user', 'role'])
export class UserHasRoles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userHasRoles, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @ManyToOne(() => Role, (role) => role.userHasRoles, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Relation<Role>;
}
