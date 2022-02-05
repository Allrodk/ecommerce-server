import { Injectable, NotFoundException } from '@nestjs/common';
import { Plano } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
const fs = require('fs');

@Injectable()
export class LogsService {
  constructor(private database: PrismaService) {}

  // async create(data: CreatePlanoDto): Promise<Plano> {
  //   const plano = await this.database.plano.create({
  //     data,
  //   });
  //   return plano;
  // }

 
  // async findAll(): Promise<Plano[]> {
  //   const plano = await this.database.plano.findMany();
  //   return plano;
  // }

  // async findOne(id: string): Promise<Plano> {
  //   return await this.planoExist(id);
  // }

}