import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { PaginationMeta, PaymentService } from './payment.service';
import { payments } from './payment.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get("/getAll")
  @ApiOperation({ summary: 'Get all payments with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiResponse({ status: 200, description: 'List of payments', schema: { example: { data: [{ id: 'uuid', studentId: 'uuid', courseId: 'uuid', teacherId: 'uuid', studentPhoneNumber: '+998901234567', createdAt: '2025-06-25T10:21:00Z', updatedAt: '2025-06-25T10:21:00Z' }], meta: { currentPage: 1, totalPages: 3, totalItems: 11, itemsPerPage: 5, hasPrevious: false, hasNext: true } } } })
  @ApiResponse({ status: 404, description: 'No payments found' })
  async findAll(@Query('page') page: number = 1): Promise<{ data: payments[]; meta: PaginationMeta }> {
    return this.paymentService.findAll({ page, limit: 5 });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiParam({ name: 'id', description: 'Payment UUID', type: String })
  @ApiResponse({ status: 200, description: 'Payment details', type: payments })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async findOne(@Param('id') id: string): Promise<payments> {
    return this.paymentService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiBody({ type: CreatePaymentDto })
  @ApiResponse({ status: 201, description: 'Payment created', type: payments })
  @ApiResponse({ status: 400, description: 'Already paid or invalid data' })
  @ApiResponse({ status: 404, description: 'Student, course, or teacher not found' })
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<payments> {
    return this.paymentService.create(createPaymentDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update payment by ID' })
  @ApiParam({ name: 'id', description: 'Payment UUID', type: String })
  @ApiBody({ type: UpdatePaymentDto })
  @ApiResponse({ status: 200, description: 'Payment updated', type: payments })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto): Promise<payments> {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete payment by ID' })
  @ApiParam({ name: 'id', description: 'Payment UUID', type: String })
  @ApiResponse({ status: 204, description: 'Payment deleted' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.paymentService.remove(id);
  }
}