import { IsEmail, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public type: string;
}
