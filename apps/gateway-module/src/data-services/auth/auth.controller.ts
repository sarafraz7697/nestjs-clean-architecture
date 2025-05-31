import {
  LoginInDto,
  LoginOutDto,
  RefreshInDto,
  RefreshOutDto,
  VerifyInDto,
  VerifyOutDto,
} from '@libs/dto/gateways';
import {
  Body,
  Controller,
  Global,
  Inject,
  Injectable,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AppController } from '../../common';

@Injectable()
@AppController('auth', { isProtected: true })
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Post('login')
  login(@Body() data: LoginInDto): Promise<LoginOutDto> {
    return firstValueFrom(this.client.send('auth_login', data));
  }

  @Post('verify')
  verify(@Body() data: VerifyInDto): Promise<VerifyOutDto> {
    return firstValueFrom(this.client.send('auth_verify', data));
  }

  @Post('refresh')
  refresh(@Body() data: RefreshInDto): Promise<RefreshOutDto> {
    return firstValueFrom(this.client.send('auth_refresh', data));
  }
}
