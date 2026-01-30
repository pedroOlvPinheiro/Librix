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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Get(':id')
  async findOne(
    @Param() findOneParams: FindOneParams,
  ): Promise<UserResponseDTO> {
    return this.usersService.findOne(findOneParams.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param() param: FindOneParams,
    @Body() user: UpdateUserDTO,
  ): Promise<void> {
    await this.usersService.update(param.id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() param: FindOneParams): Promise<void> {
    await this.usersService.delete(param.id);
  }
}
