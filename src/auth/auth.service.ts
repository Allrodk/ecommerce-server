import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, AuthResponse } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private database: PrismaService, private jwt: JwtService) {}

  async login(data: LoginDto): Promise<AuthResponse> {
    if (!data.email) {
      data.email = 'default@default.com';
    } else {
      data.email = data.email.toLocaleLowerCase();
    }
    if (!data.nickname) {
      data.nickname = 'default';
    } else {
      data.nickname = data.nickname.toLocaleLowerCase();
    }
    console.log(data.email);
    console.log(data.nickname);
    const { email, nickname, password } = data;
    const user = await this.database.user.findFirst({
      where: { OR: [{ email }, { nickname }] },
    });

    if (!user) {
      throw new NotFoundException('E-mail, apelido ou senha inválidos');
    }

    const hashValid = await bcrypt.compare(password, user.password);

    if (!user || !hashValid) {
      throw new UnauthorizedException('E-mail, apelido ou senha inválidos');
    }

    delete user.password;

    return {
      token: this.jwt.sign({ email: user.email }),
      user,
    };
  }
}
