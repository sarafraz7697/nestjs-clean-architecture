import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from '@constants/application.constant';
import { networkInterfaces, NetworkInterfaceInfo } from 'os';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) {}

  getServerIp(): string | null {
    const interfaces = networkInterfaces();
    for (const interfaceName in interfaces) {
      const interfaceInfo = interfaces[interfaceName];
      if (!interfaceInfo) continue;

      for (const inter of interfaceInfo) {
        if (inter.family === 'IPv4' && !inter.internal) {
          return inter.address;
        }
      }
    }
    return null;
  }

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') ?? 'development';
  }

  getPort(): number {
    return this.configService.get<number>('PORT') ?? 3000;
  }

  getDomain(): string {
    const nodeEnv = this.getNodeEnv();
    if (nodeEnv !== NODE_ENV.PRODUCTION) {
      const host = this.getServerIp() ?? 'localhost';
      const port = this.getPort();

      return `${host}:${port}`;
    }
    return this.configService.get<string>('DOMAIN') ?? '';
  }

  getVersion(): string {
    return this.configService.get<string>('VERSION') ?? '1.0.0';
  }

  getMongoDBConnectionString(): string {
    return this.configService.get<string>('MONGODB_CONNECTION_URI') ?? '';
  }

  getRedisConnectionString(): string {
    return this.configService.get<string>('REDIS_CONNECTION_URI') ?? '';
  }

  getAccessJwtSecret(): string {
    return this.configService.get<string>('ACCESS_JWT_SECRET') ?? '';
  }

  getAccessJwtExpirationTime(): string {
    return (
      this.configService.get<string>('ACCESS_JWT_EXPIRATION_TIME') ?? '15m'
    );
  }

  getRefreshJwtSecret(): string {
    return this.configService.get<string>('REFRESH_JWT_SECRET') ?? '';
  }

  getRefreshJwtExpirationTime(): string {
    return (
      this.configService.get<string>('REFRESH_JWT_EXPIRATION_TIME') ?? '7d'
    );
  }

  getGitlabClientId(): string {
    return this.configService.get<string>('GITLAB_CLIENT_ID') ?? '';
  }

  getGitlabClientSecret(): string {
    return this.configService.get<string>('GITLAB_CLIENT_SECRET') ?? '';
  }

  getGitlabCallbackUrl(): string {
    return this.configService.get<string>('GITLAB_CALLBACK_URL') ?? '';
  }

  getAuthCallback(): string {
    return this.configService.get<string>('AUTH_CALLBACK') ?? '';
  }
}
