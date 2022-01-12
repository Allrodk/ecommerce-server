import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}

  async create(userData: CreateUserDto): Promise<User> {
    userData.email = userData.email.toLocaleLowerCase();
    userData.nickname = userData.nickname.toLocaleLowerCase();

    const emailNicknameExists = await this.database.user.findFirst({
      where: {
        OR: [
          {
            email: userData.email,
          },
          {
            nickname: userData.nickname,
          },
        ],
      },
    });
    if (emailNicknameExists) {
      throw new ConflictException('Email ou Apelido já cadastrados');
    }

    // Validação de senha e confirmação da senha
    if (userData.password !== userData.passwordConfirmation) {
      throw new ConflictException('As senhas não conferem');
    }
    delete userData.passwordConfirmation;

    const hashedPassword = await bcrypt.hash(userData.password, 8);
    const user = await this.database.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
    delete user.password;
    return user;
  }

  async update(id: string, userData: UpdateUserDto): Promise<User> {
    const userExists = await this.database.user.findFirst({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const hashValid = await bcrypt.compare(
      userData.password,
      userExists.password,
    );
    if (!hashValid) {
      throw new UnauthorizedException('Senha antiga inválida');
    }

    if (userData.newPassword !== userData.passwordConfirmation) {
      throw new UnauthorizedException(
        'A nova senha e sua confirmação devem se iguais',
      );
    }
    userData.password = userData.newPassword;
    delete userData.newPassword;
    delete userData.passwordConfirmation;

    const hashedPassword = await bcrypt.hash(userData.password, 8);
    const user = await this.database.user.update({
      data: {
        ...userData,
        password: hashedPassword,
      },
      where: { id },
    });

    delete user.password;
    return user;
  }

  async findAll(): Promise<any[]> {
    const user = await this.database.user.findMany();
    const userNoPass = user.map(({ password, ...noPass }) => noPass);
    return userNoPass;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    delete user.password;
    return user;
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (user) {
      await this.database.user.delete({
        where: { id },
      });
    } else {
      throw new NotFoundException('Usuário não encontrado');
    }
    return { message: 'Usuário deletado com sucesso' };
  }

  async addList(user: User, planoId: string) {
    const plano = await this.database.plano.findUnique({
      where: { id: planoId },
    });
    if (!plano) {
      throw new NotFoundException('Plano não encontrado');
    }

    const listPlanos = await this.database.user.update({
      where: { id: user.id },
      data: {
        planos: {
          connect: { id: plano.id },
        },
      },
      include: { planos: true },
    });

    delete listPlanos.password;
    return listPlanos;
  }
}
