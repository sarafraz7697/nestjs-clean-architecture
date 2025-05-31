import {
  LoginInDto,
  LoginOutDto,
  RefreshInDto,
  RefreshOutDto,
  VerifyInDto,
  VerifyOutDto,
  VerifyTokenInDto,
} from '@libs/dto/gateways';

import { AuthModuleService } from './auth-module.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller()
export class AuthModuleController {
  constructor(private readonly authService: AuthModuleService) {}

  @MessagePattern('auth_login')
  login(@Payload() data: LoginInDto): LoginOutDto {
    return this.authService.login(data);
  }

  @MessagePattern('auth_verify')
  verify(@Payload() data: VerifyInDto): VerifyOutDto {
    return this.authService.verify(data);
  }

  @MessagePattern('auth_refresh')
  refresh(@Payload() data: RefreshInDto): RefreshOutDto {
    return this.authService.refresh(data);
  }

  @MessagePattern('auth_verify_token')
  verifyToken(@Payload() data: VerifyTokenInDto) {
    return this.authService.verifyToken(data);
  }
}
