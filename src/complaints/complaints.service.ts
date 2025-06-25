import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Complaint } from './complaints.model';

interface PaginationOptions {
  page: number;
  limit: number;
}

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectModel(Complaint)
    private complaintModel: typeof Complaint,
  ) {}

  async create(data: { login: string; phoneNumber: string; complaint: string }) {
    return this.complaintModel.create(data as any);
  }

  async findAll({ page = 1, limit = 5 }: PaginationOptions) {
    const offset = (page - 1) * limit;
    const complaints = await this.complaintModel.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    if (!complaints.rows.length) {
      throw new NotFoundException('No complaints found');
    }

    const totalPages = Math.ceil(complaints.count / limit);
    const hasPrevious = page > 1;
    const hasNext = page < totalPages;

    const meta: PaginationMeta = {
      currentPage: page,
      totalPages,
      totalItems: complaints.count,
      itemsPerPage: limit,
      hasPrevious,
      hasNext,
    };

    return {
      data: complaints.rows,
      meta,
    };
  }
}