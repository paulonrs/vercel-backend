import PaginationResponse from '@/models/Response/PaginationResponseModel';
import User from '../../models/user/user/userModel';

interface UserServiceInterface {
  findAllWithPagination(
    page: number,
    limit: number,
    search: string,
  ): Promise<PaginationResponse<User>>;
  addUsers(userAdd: Partial<User>): Promise<User>;
  editUser(userEdit: Partial<User>): Promise<User>;
  inactive(userId: string): Promise<User>;
  active(userId: string): Promise<User>;
}

export default UserServiceInterface;
