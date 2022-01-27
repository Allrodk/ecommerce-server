import { IsString, IsNotEmpty, IsInt, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSinglePlanoDto {
 
  @ApiProperty()
  name: string;
 
  @ApiProperty()
  duration: number;
  
  @ApiProperty()
  screen: number;
  
  @ApiProperty()
  price: number;
}