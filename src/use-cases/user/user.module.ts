import { DataServiceModule } from '@freamworks/data-service/data-service.module';
import { Module } from '@nestjs/common';
import { UserUseCase } from './user.use-case';

@Module({
  imports: [DataServiceModule],
  providers: [UserUseCase],
  exports: [UserUseCase],
})
export class UserUseCaseModule {}
