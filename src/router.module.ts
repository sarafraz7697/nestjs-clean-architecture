import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppModule } from './app.module';

@Module({
  imports: [
    AppModule,
    RouterModule.register([
      {
        path: '',
        module: AppModule,
      },
    ]),
  ],
})
export class AppRoutingModule {}
