import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from 'src/modules/auth/dto/create-user.dto';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
