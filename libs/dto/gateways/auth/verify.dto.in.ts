import { IsDefined, IsString, Length, MinLength } from 'class-validator';
import { LoginInDto } from './login.dto.in';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class VerifyInDto extends PartialType(LoginInDto) {
  @IsDefined()
  @IsString()
  @Length(5, 5)
  @ApiProperty({ example: '12345' })
  code: string;
}
