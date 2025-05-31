import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { PinoLogger } from 'nestjs-pino';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { NODE_ENV } from '@constants/application.constant';
import { AuthModuleService } from '../../../auth-module.service';
import { EnvConfigService } from '@libs/config';
@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private logger: PinoLogger,
    private authService: AuthModuleService,
    envConfigService: EnvConfigService,
  ) {
    const secretOrKey = envConfigService.getAccessJwtSecret();
    const env = envConfigService.getNodeEnv();
    super({
      ignoreExpiration: env === NODE_ENV.LOCAL,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey,
    });
  }

  public async validate(payload: any): Promise<boolean> {
    const result = await this.authService.verifyToken(payload);
    console.log('validate | payload', payload);

    //this.logger.info({ currentUser: result }, 'CurrentUser Payload');
    return result;
  }
}
