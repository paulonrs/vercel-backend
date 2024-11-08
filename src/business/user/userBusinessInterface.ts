import User from '@/models/user/userModel/userModel';

interface UserBusinessInterface {
  getUsersWithPagination(page: number, limit: number): Promise<any>;
  addUser(user: User): Promise<any>;
  editUser(user: User): Promise<any>;
  inactive(user: User): Promise<any>;
  active(user: User): Promise<any>;
}

export default UserBusinessInterface;
