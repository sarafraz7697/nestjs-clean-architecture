import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NODE_ENV } from '@constants/application.constant';
import { EnvConfigService } from '@libs/config';

@Injectable()
export class TestGuard implements CanActivate {
  constructor(private envConfigService: EnvConfigService) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    const isDevelopment =
      this.envConfigService.getNodeEnv() === NODE_ENV.DEVELOPMENT;

    if (!isDevelopment) return false;

    return true;
  }
}
