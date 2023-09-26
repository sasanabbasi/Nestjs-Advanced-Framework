import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import BaseDTO from 'src/repositories/base/base.dto';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends BaseDTO {
  @IsOptional()
  public name: string;

  @IsOptional()
  public description: string;
}
