import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import{UpdatePaymentDto} from './dto/update-payment.dto'
import { payments } from './payment.model';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Yangi to‘lov qo‘shish' })
  @ApiResponse({ status: 201, description: 'To‘lov muvaffaqiyatli qo‘shildi', type: payments })
  @ApiResponse({ status: 404, description: 'Talaba, kurs yoki o‘qituvchi topilmadi' })
  @ApiBody({ type: CreatePaymentDto })
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<payments> {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha to‘lovlarni olish' })
  @ApiResponse({ status: 200, description: 'To‘lovlar ro‘yxati', type: [payments] })
  async findAll(): Promise<payments[]> {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha to‘lovni olish' })
  @ApiParam({ name: 'id', description: 'To‘lovning UUID identifikatori', type: String })
  @ApiResponse({ status: 200, description: 'To‘lov ma‘lumotlari', type: payments })
  @ApiResponse({ status: 404, description: 'To‘lov topilmadi' })
  async findOne(@Param('id') id: string): Promise<payments> {
    return this.paymentService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'To‘lov ma‘lumotlarini yangilash' })
  @ApiParam({ name: 'id', description: 'To‘lovning UUID identifikatori', type: String })
  @ApiBody({ type: UpdatePaymentDto })
  @ApiResponse({ status: 200, description: 'To‘lov muvaffaqiyatli yangilandi', type: payments })
  @ApiResponse({ status: 404, description: 'To‘lov yoki bog‘liq ma‘lumotlar topilmadi' })
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto): Promise<payments> {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'To‘lovni o‘chirish' })
  @ApiParam({ name: 'id', description: 'To‘lovning UUID identifikatori', type: String })
  @ApiResponse({ status: 204, description: 'To‘lov muvaffaqiyatli o‘chirildi' })
  @ApiResponse({ status: 404, description: 'To‘lov topilmadi' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.paymentService.remove(id);
  }
}