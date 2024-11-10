import { injectable, inject } from 'inversify';
import UserService from '@/services/user/userService';
import UserServiceInterface from '@/services/user/userServiceInterface';
import UserBusinessInterface from './userBusinessInterface';
import User from '@/models/user/user/userModel';
import PaginationModel from '@/models/pagination/paginationModel';

@injectable()
class UserBusiness implements UserBusinessInterface {
  constructor(
    @inject('UserServiceInterface') private userService: UserServiceInterface,
  ) {}
  findAllWithPagination(paginationModel: PaginationModel): Promise<any> {
    return this.userService.findAllWithPagination(paginationModel);
  }
  addUser(user: User): Promise<Partial<User>> {
    return this.userService.addUsers(user);
  }

  editUser(user: Partial<User>): Promise<Partial<User>> {
    return this.userService.editUser(user);
  }

  inactive(userId: string): Promise<Partial<User>> {
    if (!userId) {
      throw new Error('User ID is required');
    }
    return this.userService.inactive(userId);
  }

  active(userId: string): Promise<Partial<User>> {
    if (!userId) {
      throw new Error('User ID is required');
    }
    return this.userService.active(userId);
  }
}

export default UserBusiness;
