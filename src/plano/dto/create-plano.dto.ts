import { IsString, IsNotEmpty, MinLength, IsInt, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  imageUrl: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  duration: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  screen: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;
}
