import { Controller, Post, Body, UnauthorizedException, Get, Req } from '@nestjs/common';
import { UserService } from './user.service.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('refresh-token')
  async refreshToken(@Body() body: any) {
    // Basic implementation that could be extended with actual JWT validation.
    // For now we just return ok, or if a user email is passed:
    const { email } = body;
    if (email) {
      const user = await this.userService.validateAndRefreshUser(email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    }
    return { status: 'ok' };
  }
}
