import { Module } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { PlanoController } from './plano.controller';
import { PrismaService } from '../prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [PlanoController],
  providers: [PlanoService, PrismaService, UserService],
})
export class PlanoModule {}
