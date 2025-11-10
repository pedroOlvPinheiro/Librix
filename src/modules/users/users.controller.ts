import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { FindOneParams } from 'src/utils/find-one-params';
import { UserResponseDTO } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: CreateUserDTO) {
    await this.usersService.create(user);
  }

  @Get()
  async findAll(): Promise<UserResponseDTO[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param() findOneParams: FindOneParams,
  ): Promise<UserResponseDTO> {
    return this.usersService.findOne(findOneParams.id);
  }

  @Get('search')
  async searchBy(@Query('name') name: string, @Query('email') email?: string) {
    return this.usersService.searchBy(name, email);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param() param: FindOneParams, @Body() user: UpdateUserDTO) {
    return this.usersService.update(param.id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() param: FindOneParams) {
    return this.usersService.delete(param.id);
  }
}
