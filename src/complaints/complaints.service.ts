import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Complaint } from './complaints.model';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectModel(Complaint)
    private complaintModel: typeof Complaint,
  ) {}

  async create(data: { login: string; phoneNumber: string; complaint: string }) {
    return this.complaintModel.create(data as any);
  }
}
