import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  birthdate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  passwordConfirmation: string;
}
