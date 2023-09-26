import { IsArray, IsNotEmpty } from 'class-validator';
import BaseDTO from 'src/repositories/base/base.dto';

export class UpdateRolePermissionDto extends BaseDTO {
  @IsArray()
  @IsNotEmpty()
  public permissions: string[];
}
