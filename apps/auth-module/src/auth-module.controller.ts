import { Controller, Get } from '@nestjs/common';
import { AuthModuleService } from './auth-module.service';

@Controller()
export class AuthModuleController {
  constructor(private readonly authModuleService: AuthModuleService) {}

  @Get()
  getHello(): string {
    return this.authModuleService.getHello();
  }
}
