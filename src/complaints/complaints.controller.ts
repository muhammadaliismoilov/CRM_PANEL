import { Controller, Get, Post, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { Complaint } from './complaints.model';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('complaints')
@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new complaint' })
  @ApiBody({ type: Complaint })
  @ApiResponse({ status: 201, description: 'Complaint created', type: Complaint })
  async create(@Body() data: { login: string; phoneNumber: string; complaint: string }) {
    return this.complaintsService.create(data);
  }

  @Get("/getAll")
  @ApiOperation({ summary: 'Get all complaints with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of complaints', 
    schema: { 
      example: { 
        data: [{ login: 'ali_student', phoneNumber: '+998901234567', complaint: 'Dars qiyin' }], 
        meta: { 
          currentPage: 1, 
          totalPages: 3, 
          totalItems: 11, 
          itemsPerPage: 5, 
          hasPrevious: false, 
          hasNext: true 
        } 
      } 
    } 
  })
  @ApiResponse({ status: 404, description: 'No complaints found' })
  async findAll(
    @Query('page') page: number = 1
  ): Promise<{ data: Complaint[]; meta: { currentPage: number; totalPages: number; totalItems: number; itemsPerPage: number; hasPrevious: boolean; hasNext: boolean } }> {
    return this.complaintsService.findAll({ page, limit: 5 });
  }
}