import { PartialType } from '@nestjs/swagger';
import { VerifyOutDto } from './verify.dto.out';

export class RefreshOutDto extends PartialType(VerifyOutDto) {}
