import { Test, TestingModule } from '@nestjs/testing';
import { UsersInvitaionService } from './users-invitaion.service';

describe('UsersInvitaionService', () => {
  let service: UsersInvitaionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersInvitaionService],
    }).compile();

    service = module.get<UsersInvitaionService>(UsersInvitaionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
