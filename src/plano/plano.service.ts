import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { CreateManyPlanoDto } from './dto/create-many-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { PrismaService } from 'src/prisma.service';
import { Plano } from '@prisma/client';

@Injectable()
export class PlanoService {
  constructor(private database: PrismaService) {}

  async create(data: CreatePlanoDto): Promise<Plano> {
    const plano = await this.database.plano.create({
      data,
    });
    return plano;
  }

  async createMany(data: CreateManyPlanoDto): Promise<any[]> {
    const createPlanos = [];
    await Promise.all(
      data.planos.map(async (plano) => {
        const planoExist = await this.findPerName(plano.name);
        if (!planoExist) {
          createPlanos.push(await this.create(plano));
        }
      }),
    );
    return createPlanos;
  }

  async findPerName(name: string): Promise<Plano> {
    const plano = await this.database.plano.findFirst({
      where: { name: name },
    });
    return plano;
  }

  async findAll(): Promise<Plano[]> {
    const plano = await this.database.plano.findMany();
    return plano;
  }

  async findOne(id: string): Promise<Plano> {
    return await this.planoExist(id);
  }

  async update(id: string, planoData: UpdatePlanoDto): Promise<Plano> {
    await this.planoExist(id);
    const plano = await this.database.plano.update({
      where: { id },
      data: planoData,
    });
    return plano;
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.planoExist(id);
    await this.database.plano.delete({
      where: { id },
    });
    return { message: 'Plano deletado com sucesso' };
  }

  async planoExist(id: string): Promise<Plano> {
    const planoExist = await this.database.plano.findUnique({
      where: { id },
    });
    if (!planoExist) {
      throw new NotFoundException('Plano não encontrado');
    }
    return planoExist;
  }
}
