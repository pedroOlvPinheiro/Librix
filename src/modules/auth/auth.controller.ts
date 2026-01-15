import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDTO } from './dto/user-auth.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() userAuthDTO: UserAuthDTO) {
    return this.authService.signIn(userAuthDTO);
  }

  //   @UseGuards(AuthGuard)
  //   @Get('profile')
  //   getProfile(@Request() req) {
  //     return req.user;
  //   }
}
