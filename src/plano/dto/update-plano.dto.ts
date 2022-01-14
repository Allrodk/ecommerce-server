import { IsString, IsNotEmpty, IsInt, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlanoDto {
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
