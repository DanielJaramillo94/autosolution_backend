import { Controller, Request, UseGuards, Post, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { EmailAuthGuard } from './guards/email-auth.guard';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(EmailAuthGuard)
  @Post('auth/token')
  async generateToken(@Request() req) {
    return this.authService.createToken(req.user);
  }

}