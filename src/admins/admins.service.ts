import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { admins } from './admins.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(admins)
    private adminsModel: typeof admins,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<admins> {
    const { password, ...rest } = createAdminDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.adminsModel.create({
      ...rest,
      password: hashedPassword,
    });
  }

  async findAll(): Promise<admins[]> {
    return this.adminsModel.findAll();
  }

  async findOne(id: string): Promise<admins> {
    const admin = await this.adminsModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`ID ${id} bo‘yicha admin topilmadi`);
    }
    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<admins> {
    const admin = await this.findOne(id);

    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    await admin.update(updateAdminDto);
    return admin;
  }

  async remove(id: string): Promise<void> {
    const admin = await this.findOne(id);
    await admin.destroy();
  }
}