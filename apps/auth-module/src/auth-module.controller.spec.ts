import { Test, TestingModule } from '@nestjs/testing';
import { AuthModuleController } from './auth-module.controller';
import { AuthModuleService } from './auth-module.service';

describe('AuthModuleController', () => {
  let authModuleController: AuthModuleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthModuleController],
      providers: [AuthModuleService],
    }).compile();

    authModuleController = app.get<AuthModuleController>(AuthModuleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authModuleController.getHello()).toBe('Hello World!');
    });
  });
});
