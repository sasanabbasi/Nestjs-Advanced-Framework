import { IsArray, IsNotEmpty } from 'class-validator';
import BaseDTO from 'src/repositories/base/base.dto';

export class UpdateUserRoleDto extends BaseDTO {
  @IsArray()
  @IsNotEmpty()
  public roles: string[];
}
