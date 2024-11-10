import PaginationResponse from '@/models/response/paginationResponseModel';
import User from '../../models/user/user/userModel';
import PaginationModel from '@/models/pagination/paginationModel';

interface UserServiceInterface {
  findAllWithPagination(
    paginationModel: PaginationModel,
  ): Promise<PaginationResponse<User>>;
  addUsers(userAdd: Partial<User>): Promise<User>;
  editUser(userEdit: Partial<User>): Promise<User>;
  inactive(userId: string): Promise<User>;
  active(userId: string): Promise<User>;
}

export default UserServiceInterface;
