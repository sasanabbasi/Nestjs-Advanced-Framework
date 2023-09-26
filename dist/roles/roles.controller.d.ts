import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("./entities/role.entity").Role>;
    findAll(): Promise<import("./entities/role.entity").Role[]>;
    findOne(_id: string): Promise<import("./entities/role.entity").Role>;
    update(_id: string, updateRoleDto: UpdateRoleDto): Promise<any>;
    updateRoles(_id: string, updateRolePermissionDto: UpdateRolePermissionDto): Promise<import("mongodb").UpdateResult>;
    remove(_id: string): Promise<any>;
}
