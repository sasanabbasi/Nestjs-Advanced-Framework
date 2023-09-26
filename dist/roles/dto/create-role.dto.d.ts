import BaseDTO from 'src/repositories/base/base.dto';
export declare class CreateRoleDto extends BaseDTO {
    name: string;
    description: string;
    permissions: string[];
}
