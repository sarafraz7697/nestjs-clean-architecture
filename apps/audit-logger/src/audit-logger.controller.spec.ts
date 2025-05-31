import { Test, TestingModule } from '@nestjs/testing';
import { AuditLoggerController } from './audit-logger.controller';
import { AuditLoggerService } from './audit-logger.service';

describe('AuditLoggerController', () => {
  let auditLoggerController: AuditLoggerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuditLoggerController],
      providers: [AuditLoggerService],
    }).compile();

    auditLoggerController = app.get<AuditLoggerController>(AuditLoggerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(auditLoggerController.getHello()).toBe('Hello World!');
    });
  });
});
