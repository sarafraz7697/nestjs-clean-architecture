import {
  LoginInDto,
  LoginOutDto,
  RefreshInDto,
  RefreshOutDto,
  VerifyInDto,
  VerifyOutDto,
  VerifyTokenInDto,
} from '@libs/dto/gateways';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthModuleService {
  login(data: LoginInDto): LoginOutDto {
    return { ok: true };
  }

  verify(data: VerifyInDto): VerifyOutDto {
    return { accessToken: 'acc-token', refreshToken: 'ref-token' };
  }

  refresh(data: RefreshInDto): RefreshOutDto {
    return { accessToken: 'acc-token', refreshToken: 'ref-token' };
  }

  verifyToken(data: VerifyTokenInDto): boolean {
    return true;
  }
}
