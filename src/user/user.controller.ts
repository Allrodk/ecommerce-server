import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthUser } from '../auth/auth-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthAdmin } from 'src/auth/auth-admin.decorator';

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
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Retorna um usuário',
  })
  @ApiBearerAuth()
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

  @UseGuards(AuthGuard())
  @Patch('addList/:id')
  @ApiOperation({
    summary: 'Adiciona ou remove item do carrinho',
  })
  @ApiBearerAuth()
  
  addList(@AuthAdmin() user: User, @Param('id') planoId: string) {      
    return this.service.addList(user, planoId);
  }

  @UseGuards(AuthGuard())
  @Get('cartList')
  @ApiOperation({
    summary: 'Retorna a lista do carrinho',
  })
  @ApiBearerAuth()
  cartList(@AuthUser() user: User) {
    return this.service.cartList(user.id);
  }
}
