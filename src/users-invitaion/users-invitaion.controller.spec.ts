import { Test, TestingModule } from '@nestjs/testing';
import { UsersInvitaionController } from './users-invitaion.controller';
import { UsersInvitaionService } from './users-invitaion.service';

describe('UsersInvitaionController', () => {
  let controller: UsersInvitaionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersInvitaionController],
      providers: [UsersInvitaionService],
    }).compile();

    controller = module.get<UsersInvitaionController>(UsersInvitaionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
