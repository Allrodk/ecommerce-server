import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Cadastra um usuário',
  })
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }

  @Patch('update/:id')
  @ApiOperation({
    summary: 'Edita um usuário',
  })
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    return this.service.update(id, data);
  }

  @Get('findAll')
  @ApiOperation({
    summary: 'Lista todos os usuários',
  })
  findAll(): Promise<any[]> {
    return this.service.findAll();
  }

  @Get('findOne/:id')
  @ApiOperation({
    summary: 'Retorna um usuário',
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

  @Delete('remove/:id')
  @ApiOperation({
    summary: 'Deleta um usuário',
  })
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.remove(id);
  }
}
