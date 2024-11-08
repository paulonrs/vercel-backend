import { injectable } from 'inversify';
import User from '../../models/user/userModel/userModel';
import UserServiceInterface from './userServiceInterface';
import { prismaClient } from '../../database/prismaClient';
import PaginationResponse from '@/models/Response/PaginationResponseModel';

@injectable()
class UserService implements UserServiceInterface {
  public async getAllUsers(): Promise<User[]> {
    const users = await prismaClient.user.findMany();

    return users;
  }

  async getUsersWithPagination(
    page: number,
    limit: number,
  ): Promise<PaginationResponse<User>> {
    const users = await prismaClient.user.findMany({
      skip: page * limit - limit,
      take: limit,
    });

    const totalUsers = await prismaClient.user.count();

    const paginationResponse: PaginationResponse<User> = {
      data: users,
      total: totalUsers,
    };

    return paginationResponse;
  }

  public async addUsers(userAdd: any): Promise<User> {
    const { email, username, name, password } = userAdd;

    const verifyIfExistsUser = await prismaClient.user.findFirst({
      where: {
        username,
        OR: {
          email,
        },
      },
    });

    if (verifyIfExistsUser) Error('User already exists');

    const userCreated = await prismaClient.user.create({
      data: {
        email,
        username,
        name,
        password,
      },
    });

    return userCreated;
  }

  async editUser(userEdit: any): Promise<User> {
    const { id, email, username, name, password } = userEdit;

    const verifyIfExistsUser = await prismaClient.user.findUnique({
      where: { id },
    });

    if (verifyIfExistsUser) Error('User already not exists');

    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: {
        email,
        username,
        name,
        password,
      },
    });

    return updatedUser;
  }

  async inactive(userEdit: any): Promise<User> {
    const { id } = userEdit;

    const verifyIfExistsUser = await prismaClient.user.findUnique({
      where: { id },
    });

    if (verifyIfExistsUser) Error('User already not exists');

    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: {
        id,
      },
    });

    return updatedUser;
  }

  async active(userEdit: any): Promise<User> {
    const { id } = userEdit;

    const verifyIfExistsUser = await prismaClient.user.findUnique({
      where: { id },
    });

    if (verifyIfExistsUser) Error('User already not exists');

    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: {
        id,
      },
    });

    return updatedUser;
  }
}

export default UserService;
