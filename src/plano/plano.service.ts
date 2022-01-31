import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { CreateManyPlanoDto } from './dto/create-many-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { PrismaService } from 'src/prisma.service';
import { Plano } from '@prisma/client';
import { UpdatePlanilhaDto } from './dto/update-planilha.dto';
import { UpdateSinglePlanoDto } from './dto/upadate-singlePlano.dto';
import * as XLSX from 'XLSX';
import { diskStorage } from 'multer';
import { extname } from 'path';
const fs = require('fs');

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
        // const planoExist = await this.findPerName(plano.name);
        // if (!planoExist) {
        createPlanos.push(await this.create(plano));
        // }
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

  async updateSingle(
    name: string,
    planoData: UpdateSinglePlanoDto,
  ): Promise<Plano> {
    const singlePlano = await this.findPerName(name);
    const plano = await this.database.plano.update({
      where: { id: singlePlano.id },
      data: planoData,
    });
    return plano;
  }

  async updateMany(manyData: UpdatePlanilhaDto): Promise<any[]> {
    const updatePlanos = [];
    await Promise.all(
      manyData.data.map(async (plano) => {
        const planoExist = await this.findPerName(plano.name);
        if (planoExist) {
          updatePlanos.push(await this.updateSingle(plano.name, plano));
        }
      }),
    );
    return updatePlanos;
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

  storage() {
     storage: diskStorage({
      destination: './Uploads',
      filename: (req, file, cb) => {
        const filename: string = file.originalname;
        const extension: string = extname(file.originalname);
        const allowedMimes = ['.csv', '.xls', '.xlsx'];
        if (allowedMimes.includes(extension)) {
          cb(null, `${filename}`);
        } else {
           cb(new Error('Tipo de arquivo inválido'), `${filename}`);
        }
      },
    });
  }

  readFile() {
    let filePath = '';
    if (fs.existsSync('./Uploads/UpdateMany100.xlsx')) {
      filePath = './Uploads/UpdateMany100.xlsx';
    }
    if (fs.existsSync('./Uploads/UpdateMany100.xls')) {
      filePath = './Uploads/UpdateMany100.xls';
    }
    if (fs.existsSync('./Uploads/UpdateMany100.csv')) {
      filePath = './Uploads/UpdateMany100.csv';
    }
    let data = [];
    const wb = XLSX.readFile(filePath);
    for (const sheet in wb.Sheets) {
      if (wb.Sheets.hasOwnProperty(sheet)) {
        data = data.concat(XLSX.utils.sheet_to_json(wb.Sheets[sheet]));
        break;
      }
    }
    return { data, filePath };
  }

  deleteFile(filePath) {
    fs.unlink(filePath, function (err) {
      if (err) {
        throw new NotFoundException(err);
      }
    });
  }
}
