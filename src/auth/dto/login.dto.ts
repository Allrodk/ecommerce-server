import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

// entrada
export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

// resposta
export class AuthResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @IsNotEmpty()
  @ApiProperty()
  user: User;
}
