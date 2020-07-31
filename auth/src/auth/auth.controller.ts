import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Post('auth')
  async login(req) {
    return this.authService.login(req.user);
  }
}
