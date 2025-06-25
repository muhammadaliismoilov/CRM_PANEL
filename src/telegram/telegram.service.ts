import { Injectable, OnModuleInit } from '@nestjs/common';
import { ComplaintsService } from '../complaints/complaints.service';
import * as TelegramBot from 'node-telegram-bot-api';


@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;
  private userState = new Map<number, any>();

  constructor(private readonly complaintsService: ComplaintsService) {}

  onModuleInit() {
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
    try {
      this.bot.setMyCommands([
        { command: '/start', description: 'Buyurtma berish' },
        { command: '/shikoyat ', description: 'Shikoyat jonatishi uchun' },

      ]);

    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      this.userState.set(chatId, { step: 'login' });
      this.bot.sendMessage(chatId, 'Loginingizni kiriting:');
    });

    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text || '';
      const state = this.userState.get(chatId);

      if (!state || text.startsWith('/start')) return;

      if (state.step === 'login') {
        state.login = text;
        state.step = 'phone';
        this.bot.sendMessage(chatId, 'Telefon raqamingizni kiriting:');
      } else if (state.step === 'phone') {
        state.phoneNumber = text;
        state.step = 'complaint';
        this.bot.sendMessage(chatId, 'Shikoyatingizni yozing:');
      } else if (state.step === 'complaint') {
        state.complaint = text;

        // Saqlash
        await this.complaintsService.create({
          login: state.login,
          phoneNumber: state.phoneNumber,
          complaint: state.complaint,
        });

        this.bot.sendMessage(chatId, 'Shikoyatingiz qabul qilindi. Rahmat!');
        this.userState.delete(chatId);
      }

      this.userState.set(chatId, state);
    });
    } catch (error) {
      console.error('Telegram bot initialization error:', error);
    }
  }
}
