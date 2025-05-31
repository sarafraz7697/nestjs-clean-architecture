import { Test, TestingModule } from '@nestjs/testing';
import { GatewayModuleController } from './gateway-module.controller';
import { GatewayModuleService } from './gateway-module.service';

describe('GatewayModuleController', () => {
  let gatewayModuleController: GatewayModuleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GatewayModuleController],
      providers: [GatewayModuleService],
    }).compile();

    gatewayModuleController = app.get<GatewayModuleController>(GatewayModuleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gatewayModuleController.getHello()).toBe('Hello World!');
    });
  });
});
