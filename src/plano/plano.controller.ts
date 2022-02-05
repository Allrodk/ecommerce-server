import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PlanoService } from './plano.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { CreateManyPlanoDto } from './dto/create-many-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Plano, User } from '@prisma/client';
import { UpdatePlanilhaDto } from './dto/update-planilha.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from 'rxjs';
import { Storage } from './config';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { UserService } from 'src/user/user.service';

@ApiTags('plano')
@Controller('plano')
export class PlanoController {
  constructor(
    private readonly service: PlanoService,
    private readonly userService: UserService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'Cadastra um plano',
  })
  create(@Body() data: CreatePlanoDto): Promise<Plano> {
    return this.service.create(data);
  }

  @Post('createMany')
  @ApiOperation({
    summary: 'Cadastra vários planos',
  })
  createMany(@Body() data: CreateManyPlanoDto): Promise<any[]> {
    return this.service.createMany(data);
  }

  @Get('findAll')
  @ApiOperation({
    summary: 'Lista todos os planos',
  })
  findAll(): Promise<Plano[]> {
    return this.service.findAll();
  }

  @Get('findOne/:id')
  @ApiOperation({
    summary: 'Retorna um plano',
  })
  findOne(@Param('id') id: string): Promise<Plano> {
    return this.service.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({
    summary: 'Edita um plano',
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdatePlanoDto,
  ): Promise<Plano> {
    return this.service.update(id, data);
  }

  @Patch('updateMany')
  @ApiOperation({
    summary: 'Edita vários planos',
  })
  updateMany(
    @Body() manyData: UpdatePlanilhaDto,
    filePath: string,
  ): Promise<{ message: string }> {
    return this.service.updateMany(manyData, filePath);
  }

  @Post('upload')
  @ApiOperation({
    summary: 'Faz upload de arquivos',
  })
  @UseInterceptors(FileInterceptor('file', Storage))
  uploadFile(@UploadedFile() file): Observable<Object> {
    const { data, filePath } = this.service.readFile();
    const dataJson = { data };
    const response = this.updateMany(dataJson, filePath);
    console.log(response);    
    // this.userService.findOne(data[1].id)
    return of({ message: response });
  }

  @Delete('remove/:id')
  @ApiOperation({
    summary: 'Deleta um plano',
  })
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.remove(id);
  }
}
