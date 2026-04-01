import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDTO {
  @ApiProperty({
    example: 'bc2d0f53-5041-46e8-a14c-267875a49f0c',
    description: 'UUID do usuário no sistema',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'Pedro Oliveira da Silva',
    description: 'Nome do usuário no sistema',
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'exemplo@email.com',
    description: 'Email do usuário no sistema',
  })
  @Expose()
  email: string;
}
