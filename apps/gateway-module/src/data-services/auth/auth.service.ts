import { LoginInDto } from '@libs/dto/gateways';
import {
  LoginOutDto,
  RefreshInDto,
  RefreshOutDto,
  VerifyInDto,
  VerifyOutDto,
} from '@libs/dto/gateways/auth';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(data: LoginInDto): LoginOutDto {
    return { ...data };
  }

  verify(data: VerifyInDto): VerifyOutDto {
    return { accessToken: 'acc', refreshToken: 'ref' };
  }

  refresh(data: RefreshInDto): RefreshOutDto {
    return { accessToken: 'acc', refreshToken: 'ref' };
  }
}
