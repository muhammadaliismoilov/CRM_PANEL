import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/guards/roles.decarator';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get("/getAll")
  @UseGuards(JwtAuthGuard)
    @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({ status: 200, description: 'Reports data', schema: { example: { totalStudents: 50, totalTeachers: 10, totalCourses: 20, droppedStudentsThisMonth: 5 } } })
  async getAll() {
    return this.reportsService.getAll();
  }

  @Get('/chart')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Get yearly chart data' })
  @ApiResponse({ status: 200, description: 'Yearly chart data', schema: { example: [{ month: "Jun 2025", enrolled: 5, dropped: 2 }, { month: "May 2025", enrolled: 3, dropped: 1 }] } })
  async getChart() {
    return this.reportsService.getChart();
  }
}