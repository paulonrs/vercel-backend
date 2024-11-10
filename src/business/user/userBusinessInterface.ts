import User from '@/models/user/user/userModel';

interface UserBusinessInterface {
  findAllWithPagination(
    page: number,
    limit: number,
    search: string,
  ): Promise<any>;
  addUser(user: User): Promise<any>;
  editUser(user: User): Promise<any>;
  inactive(userId: string): Promise<any>;
  active(userId: string): Promise<any>;
}

export default UserBusinessInterface;
