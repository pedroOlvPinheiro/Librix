import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'src/utils/enum/role.enum';

export const ROLES_KEY = 'roles';
export const Role = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
