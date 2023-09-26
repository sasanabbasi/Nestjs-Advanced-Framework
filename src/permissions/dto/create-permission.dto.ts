import { IsNotEmpty, IsArray } from 'class-validator';
import BaseDTO from 'src/repositories/base/base.dto';

export class CreatePermissionDto extends BaseDTO {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public displayName: string;

  public description: string;
}
