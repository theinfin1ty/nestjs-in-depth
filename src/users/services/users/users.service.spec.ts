import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../typeorm';
import { UsersService } from './users.service';
import * as bcryptUtils from '../../../utils/bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    jest.spyOn(bcryptUtils, 'encodePassword').mockReturnValue('hashedtest');
    it('should encode password correctly', async () => {
      await service.createUser({
        username: 'test',
        email: 'test@gmail.com',
        password: 'test',
      });
      expect(bcryptUtils.encodePassword).toHaveBeenCalledWith('test');
    });

    it('should call userRepository.create with correct params', async () => {
      await service.createUser({
        username: 'test',
        email: 'test@gmail.com',
        password: 'test',
      });
      expect(userRepository.create).toHaveBeenCalledWith({
        username: 'test',
        email: 'test@gmail.com',
        password: 'hashedtest',
      });
      expect(userRepository.create);
    });

    it('should call userRepository.create with correct params', async () => {
      jest.spyOn(userRepository, 'create').mockReturnValueOnce({
        id: 1,
        username: 'test',
        email: 'test@gmail.com',
        password: 'hashedtest',
      });
      await service.createUser({
        username: 'test',
        email: 'test@gmail.com',
        password: 'test',
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        id: 1,
        username: 'test',
        email: 'test@gmail.com',
        password: 'hashedtest',
      });
    });
  });
});
