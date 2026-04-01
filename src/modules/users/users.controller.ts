import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { FindOneParams } from 'src/utils/find-one-params';
import { UserResponseDTO } from './dto/user-response.dto';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { PaginatedResponseDTO } from 'src/common/dto/paginated-response.dto';
import { RoleEnum } from 'src/utils/enum/role.enum';
import { Role } from 'src/common/decorator/role.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Role(RoleEnum.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Retorna todos os usuários do sistema' })
  @ApiResponse({
    status: 200,
    description: 'Usuários retornados com sucesso',
    type: UserResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Token expirado ou inexistente',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @Get()
  async findAll(
    @Query() paginationQueryDTO: PaginationQueryDTO,
  ): Promise<PaginatedResponseDTO<UserResponseDTO>> {
    return this.usersService.findAll(paginationQueryDTO);
  }

  @Get('search')
  async searchBy(@Query('name') name: string, @Query('email') email?: string) {
    return this.usersService.searchBy(name, email);
  }

  @ApiOperation({ summary: 'Restaura um usuário que sofreu soft delete' })
  @ApiResponse({ status: 204, description: 'Usuário restaurado com sucesso' })
  @ApiResponse({
    status: 401,
    description: 'Token expirado ou inexistente',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @Patch('restore/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async restore(@Param() param: FindOneParams): Promise<void> {
    await this.usersService.restore(param.id);
  }

  @ApiOperation({ summary: 'Busca um usuário pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: UserResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Token expirado ou inexistente',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @Get(':id')
  async findOne(
    @Param() findOneParams: FindOneParams,
  ): Promise<UserResponseDTO> {
    return this.usersService.findOne(findOneParams.id);
  }

  @ApiOperation({
    summary: 'Atualiza dados parciais ou todos os dados de um usuário',
  })
  @ApiResponse({ status: 204, description: 'Dados atualizados com sucesso' })
  @ApiResponse({
    status: 401,
    description: 'Token expirado ou inexistente',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param() param: FindOneParams,
    @Body() user: UpdateUserDTO,
  ): Promise<void> {
    await this.usersService.update(param.id, user);
  }

  @ApiOperation({ summary: 'Aplica soft delete em um usuário' })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  @ApiResponse({
    status: 401,
    description: 'Token expirado ou inexistente',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() param: FindOneParams): Promise<void> {
    await this.usersService.delete(param.id);
  }
}
