import { injectable } from 'inversify';
import User from '../../models/user/userModel/userModel';
import UserServiceInterface from './userServiceInterface';
import { prismaClient } from '../../database/prismaClient';

@injectable()
class UserService implements UserServiceInterface {
  public async getAllUsers(): Promise<User[]> {
    const users = await prismaClient.user.findMany();

    return users;
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
}

export default UserService;
