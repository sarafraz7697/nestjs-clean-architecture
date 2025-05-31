import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthModuleService {
  getHello(): string {
    return 'Hello World!';
  }
}
