import { IsOptional } from 'class-validator';
import BaseDTO from 'src/repositories/base/base.dto';

export class UpdatePermissionDto extends BaseDTO {
  @IsOptional()
  public name: string;

  @IsOptional()
  public displayName: string;

  @IsOptional()
  public description: string;
}
