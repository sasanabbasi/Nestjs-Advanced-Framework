import { UsersInvitaionService } from './users-invitaion.service';
import { CreateUsersInvitaionDto } from './dto/create-users-invitaion.dto';
import { UpdateUsersInvitaionDto } from './dto/update-users-invitaion.dto';
export declare class UsersInvitaionController {
    private readonly usersInvitaionService;
    constructor(usersInvitaionService: UsersInvitaionService);
    create(createUsersInvitaionDto: CreateUsersInvitaionDto): Promise<import("./entities/users-invitaion.entity").UserInvitation>;
    findAll(): Promise<import("./entities/users-invitaion.entity").UserInvitation[]>;
    findOne(_id: string): Promise<import("./entities/users-invitaion.entity").UserInvitation>;
    update(_id: string, updateUsersInvitaionDto: UpdateUsersInvitaionDto): Promise<any>;
    remove(_id: string): Promise<any>;
}
