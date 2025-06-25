import { Controller, Post, Body, Res, HttpCode, HttpStatus, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt'; // JwtService ni injekt qilish
import { loginDto } from 'src/admins/dto/login-dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService, // JwtService ni qo‘shish
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Successfully logged in', schema: { example: { id: 'uuid', login: 'ali_admin', role: 'admin', accessToken: 'jwt-token', refreshToken: 'jwt-token' } } })
  @ApiResponse({ status: 401, description: 'Invalid login or password' })
  @ApiBody({ type: loginDto })
  async login(
    @Body() { login, password }: { login: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id, login: userLogin, role, accessToken, refreshToken } = await this.authService.login(login, password);

    // Access token cookie'ga saqlash (15 daqiqa)
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, // 15 daqiqa
    });

    // Refresh token cookie'ga saqlash (7 kun)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 kun
    });

    return { id, login: userLogin, role, accessToken };
  }

  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Successfully logged out', schema: { example: { message: 'Successfully logged out' } } })
  async logout(@Res({ passthrough: true }) res: Response) {
    // Cookie'larni o'chirish
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return this.authService.logout();
  }
}