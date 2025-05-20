import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as handlebars from 'handlebars';
import { join } from 'path';

export function staticAssetsConfig(app: NestFastifyApplication): void {
  const basePath = join(__dirname, '../../../../');

  app.useStaticAssets({
    root: join(basePath, 'dist/public'),
    prefix: '/v1/',
  });

  handlebars.registerHelper('eq', (a, b) => a === b);

  app.setViewEngine({
    engine: {
      handlebars,
    },
    templates: join(basePath, 'dist/client'),
  });
}
