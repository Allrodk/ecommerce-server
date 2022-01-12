import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 150)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2)
  @ApiProperty()
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(6, 150)
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  @ApiProperty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  @ApiProperty()
  passwordConfirmation: string;
}
