import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import BaseDTO from 'src/repositories/base/base.dto';

export class CreateRoleDto extends BaseDTO {
  @IsNotEmpty()
  public name: string;

  public description: string;

  @IsArray()
  @IsOptional()
  public permissions: string[];
}
