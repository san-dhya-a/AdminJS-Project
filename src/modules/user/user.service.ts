import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity.js';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async authenticate(email: string, password: string):Promise<any | null> {
    const user = await this.userRepository.findOneBy({ email });
    
    if (user && user.password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return {
          email: user.email,
          title: user.name || user.email,
          avatarUrl: null,
        };
      }
    }
    return null;
  }

  async validateAndRefreshUser(email: string): Promise<any | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      return {
        email: user.email,
        title: user.name || user.email,
        avatarUrl: null,
      };
    }
    return null;
  }
}
