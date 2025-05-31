import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditLoggerService {
  getHello(): string {
    return 'Hello World!';
  }
}
