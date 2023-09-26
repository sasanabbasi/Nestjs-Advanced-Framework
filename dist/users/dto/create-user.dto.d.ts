import BaseDTO from 'src/repositories/base/base.dto';
export declare class CreateUserDto extends BaseDTO {
    name: string;
    email: string;
    password: string;
    roles: string[];
    profilePic: string;
    phone: string;
}
