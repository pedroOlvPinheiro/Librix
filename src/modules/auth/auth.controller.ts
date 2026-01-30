import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserAuthDTO } from './dto/user-auth.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  async signIn(@Body() userAuthDTO: UserAuthDTO) {
    return await this.authService.signIn(userAuthDTO);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    await this.authService.signUp(createUserDTO);
  }
}
