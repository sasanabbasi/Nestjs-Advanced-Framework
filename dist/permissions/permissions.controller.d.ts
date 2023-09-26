import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    create(createPermissionDto: CreatePermissionDto): Promise<import("./entities/permission.entity").Permission>;
    findAll(): Promise<import("./entities/permission.entity").Permission[]>;
    findOne(_id: string): Promise<import("./entities/permission.entity").Permission>;
    update(_id: string, updatePermissionDto: UpdatePermissionDto): Promise<any>;
    remove(_id: string): Promise<any>;
}
