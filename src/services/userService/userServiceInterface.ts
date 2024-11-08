import PaginationResponse from '@/models/Response/PaginationResponseModel';
import User from '../../models/user/userModel/userModel';

interface UserServiceInterface {
  getAllUsers(): Promise<User[]>;
  getUsersWithPagination(
    page: number,
    limit: number,
  ): Promise<PaginationResponse<User>>;
  addUsers(userAdd: any): Promise<User>;
  editUser(userEdit: any): Promise<User>;
  inactive(userEdit: any): Promise<User>;
  active(userEdit: any): Promise<User>;
}

export default UserServiceInterface;
