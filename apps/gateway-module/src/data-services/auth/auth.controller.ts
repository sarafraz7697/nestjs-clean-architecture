import {
  LoginInDto,
  LoginOutDto,
  RefreshInDto,
  RefreshOutDto,
  VerifyInDto,
  VerifyOutDto,
} from '@libs/dto/gateways';
import { Body, Controller, Global, Injectable, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
@Controller('auth')
@Global()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: LoginInDto): LoginOutDto {
    return this.authService.login(data);
  }

  @Post('verify')
  verify(@Body() data: VerifyInDto): VerifyOutDto {
    return this.authService.verify(data);
  }

  @Post('refresh')
  refresh(@Body() data: RefreshInDto): RefreshOutDto {
    return this.authService.refresh(data);
  }
}
