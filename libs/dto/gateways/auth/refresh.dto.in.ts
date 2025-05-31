import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class RefreshInDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ example: 'refresh-token' })
  refreshToken: string;
}
