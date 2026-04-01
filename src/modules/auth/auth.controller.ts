import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserAuthDTO } from './dto/user-auth.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Autentica o usuário e retorna o token de acesso' })
  @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signin')
  async signIn(@Body() userAuthDTO: UserAuthDTO) {
    return await this.authService.signIn(userAuthDTO);
  }

  @ApiOperation({ summary: 'Realiza o cadastro de um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário cadastrado' })
  @ApiResponse({ status: 409, description: 'Dados já existentes no banco' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos' })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    await this.authService.signUp(createUserDTO);
  }
}
