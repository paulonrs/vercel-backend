import { injectable, inject } from 'inversify';
import UserService from '@/services/userService/userService';
import UserServiceInterface from '@/services/userService/userServiceInterface';
import UserBusinessInterface from './userBusinessInterface';
import User from '@/models/user/userModel/userModel';

@injectable()
class UserBusiness implements UserBusinessInterface {
  constructor(@inject(UserService) private userService: UserServiceInterface) {}
  getUsersWithPagination(page: number, limit: number): Promise<any> {
    return this.userService.getUsersWithPagination(page, limit);
  }
  addUser(user: User): Promise<any> {
    return this.userService.addUsers(user);
  }

  editUser(user: any): Promise<any> {
    return this.userService.editUser(user);
  }
  inactive(user: any): Promise<any> {
    return this.userService.inactive(user);
  }
  active(user: any): Promise<any> {
    return this.userService.active(user);
  }
}

export default UserBusiness;
