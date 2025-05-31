import { LoginInDto } from './login.dto.in';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class VerifyOutDto extends PartialType(LoginInDto) {
  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  accessToken: string;
}
