import { Module } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { PlanoController } from './plano.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PlanoController],
  providers: [PlanoService, PrismaService],
})
export class PlanoModule {}
