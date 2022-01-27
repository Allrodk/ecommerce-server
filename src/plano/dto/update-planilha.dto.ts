import {UpdateSinglePlanoDto} from './upadate-singlePlano.dto'
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePlanilhaDto {
  @IsNotEmpty()
  @ApiProperty()
  data: UpdateSinglePlanoDto[];
}
