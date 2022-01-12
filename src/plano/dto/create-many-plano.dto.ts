import { CreatePlanoDto } from './create-plano.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateManyPlanoDto {
  @IsNotEmpty()
  @ApiProperty()
  planos: CreatePlanoDto[];
}
