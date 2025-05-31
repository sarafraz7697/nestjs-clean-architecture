import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class VerifyTokenInDto {
  @IsDefined()
  @ApiProperty()
  accessToken: string;
}
