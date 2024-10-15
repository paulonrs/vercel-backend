import User from '../../models/user/userModel/userModel';

interface UserServiceInterface {
  getAllUsers(): Promise<User[]>;
}

export default UserServiceInterface;
