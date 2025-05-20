import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'app.module';

export function swaggerConfig(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Application Api')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule],
  });

  SwaggerModule.setup('api/app', app, document);
}
