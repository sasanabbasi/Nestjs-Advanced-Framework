import {
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import BaseDTO from 'src/repositories/base/base.dto';

export class CreateUserDto extends BaseDTO {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  public password: string;

  @IsArray()
  @IsOptional()
  public roles: string[];

  @IsOptional()
  public profilePic: string;

  @IsOptional()
  public phone: string;
}
