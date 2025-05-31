import { Controller, Get } from '@nestjs/common';
import { AuditLoggerService } from './audit-logger.service';

@Controller()
export class AuditLoggerController {
  constructor(private readonly auditLoggerService: AuditLoggerService) {}

  @Get()
  getHello(): string {
    return this.auditLoggerService.getHello();
  }
}
