import { Prisma } from '@prisma/client/edge';
import User from '../../models/user/user/userModel';

interface UserRepositoryInterface {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  count(): Promise<number>;
  findAllWithPagination(
    page: number,
    limit: number,
    search: string,
  ): Promise<User[]>;
}

export default UserRepositoryInterface;