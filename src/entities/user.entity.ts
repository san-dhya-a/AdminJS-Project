import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, OneToMany, Relation, ManyToMany, JoinTable } from 'typeorm';
import { UserHasRoles } from './user-has-roles.entity.js';
import { Role } from './role.entity.js';

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

  @Column({ default: 'active' })
  status: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_has_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Relation<Role>[];
}
