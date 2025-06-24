import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ComplaintsModule } from '../complaints/complaints.module';

@Module({
  imports: [ComplaintsModule],
  providers: [TelegramService],
})
export class TelegramModule {}
