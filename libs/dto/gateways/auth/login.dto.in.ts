import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginInDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ example: 'jesus@mail.com' })
  @IsEmail()
  email: string;
}
