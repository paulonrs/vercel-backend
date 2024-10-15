import { injectable } from 'inversify';
import User from '../../models/user/userModel/userModel';
import UserServiceInterface from './userServiceInterface';

@injectable()
class UserService implements UserServiceInterface {
  public async getAllUsers(): Promise<User[]> {
    return [
      {
        id: '1',
        name: 'teste',
        email: 'aa@aa.com',
        password: '123',
      },
    ];
  }
}

export default UserService;
