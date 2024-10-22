import User from '../../models/user/userModel/userModel';

interface UserServiceInterface {
  getAllUsers(): Promise<User[]>;
  addUsers(userAdd: any): Promise<User>;
}

export default UserServiceInterface;
