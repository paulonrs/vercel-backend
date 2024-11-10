import PaginationModel from '@/models/pagination/paginationModel';
import User from '@/models/user/user/userModel';

interface UserBusinessInterface {
  findAllWithPagination(paginationModel: PaginationModel): Promise<any>;
  addUser(user: User): Promise<any>;
  editUser(user: User): Promise<any>;
  inactive(userId: string): Promise<any>;
  active(userId: string): Promise<any>;
}

export default UserBusinessInterface;
