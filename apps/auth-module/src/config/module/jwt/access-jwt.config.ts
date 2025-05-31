import { EnvConfigService } from '@libs/config';
import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class AccessJwtConfig implements JwtOptionsFactory {
  constructor(private envConfigService: EnvConfigService) {}

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    const jwtSecret = this.envConfigService.getAccessJwtSecret();
    const expireationTime = this.envConfigService.getAccessJwtExpirationTime();

    return {
      secret: jwtSecret,
      signOptions: { expiresIn: expireationTime },
    };
  }
}
