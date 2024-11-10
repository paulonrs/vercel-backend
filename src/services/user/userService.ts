import { inject, injectable } from 'inversify';
import User from '../../models/user/user/userModel';
import UserServiceInterface from './userServiceInterface';
import PaginationResponse from '@/models/response/paginationResponseModel';
import UserRepositoryInterface from '@/repository/user/userRepositoryInterface';
import AuthenticationProvider from '@/providers/authentication/authenticationProvider';
import { enumBusinessError } from '@/Error/error';
import PaginationModel from '@/models/pagination/paginationModel';

@injectable()
class UserService implements UserServiceInterface {
  constructor(
    @inject('UserRepositoryInterface')
    private userRepository: UserRepositoryInterface,
  ) {}

  async findAllWithPagination(
    paginationModel: PaginationModel,
  ): Promise<PaginationResponse<User>> {
    const users =
      await this.userRepository.findAllWithPagination(paginationModel);
    const totalUsers = await this.userRepository.count();

    const paginationResponse: PaginationResponse<User> = {
      data: users,
      total: totalUsers,
    };

    return paginationResponse;
  }

  public async addUsers(userAdd: Partial<User>): Promise<User> {
    const { email, name, password } = userAdd;

    if (!email || !name || !password) {
      throw new Error('Missing required user fields');
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const userCreated = await this.userRepository.create({
      email,
      name,
      password,
    });

    return userCreated;
  }

  async editUser(userEdit: Partial<User>): Promise<User> {
    if (!userEdit.id) {
      throw new Error('User ID is required');
    }
    const verifyIfExistsUser = await this.userRepository.findById(userEdit.id);

    if (verifyIfExistsUser) Error('User already not exists');

    const updatedUser = await this.userRepository.update(userEdit.id, userEdit);

    return updatedUser;
  }

  async inactive(userId: string): Promise<User> {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const verifyIfExistsUser = await this.userRepository.findById(userId);

    if (verifyIfExistsUser) Error('User already not exists');

    const updatedUser = await this.userRepository.update(userId, {
      deletadAt: new Date(),
    });

    return updatedUser;
  }

  async active(userId: string): Promise<User> {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const verifyIfExistsUser = await this.userRepository.findById(userId);

    if (verifyIfExistsUser) Error('User already not exists');

    const updatedUser = await this.userRepository.update(userId, {
      deletadAt: null,
    });

    return updatedUser;
  }
}

export default UserService;
