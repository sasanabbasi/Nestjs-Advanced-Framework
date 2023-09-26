import { IsEmail, IsOptional } from 'class-validator';
import BaseDTO from 'src/repositories/base/base.dto';

export class UpdateUserDto extends BaseDTO {
  @IsOptional()
  public name: string;

  @IsOptional()
  public profilePic: string;

  @IsOptional()
  public phone: string;
}
