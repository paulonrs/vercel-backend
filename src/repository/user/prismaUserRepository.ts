import { Prisma } from '@prisma/client/edge';
import { prismaClient } from '../../database/prismaClient';
import User from '../../models/user/user/userModel';
import UserRepositoryInterface from './userRepositoryInterface';
import { injectable } from 'inversify';

@injectable()
class PrismaUserRepository implements UserRepositoryInterface {
  async findAll(): Promise<User[]> {
    return await prismaClient.user.findMany();
  }

  findAllWithPagination(
    page: number,
    limit: number,
    search: string = '',
  ): Promise<User[]> {
    return prismaClient.user.findMany({
      skip: page * limit - limit,
      take: limit,
      where: {
        OR: [{ name: { contains: search } }, { email: { contains: search } }],
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prismaClient.user.findFirst({
      where: {
        OR: [{ email }],
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prismaClient.user.create({
      data,
    });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return await prismaClient.user.update({
      where: { id },
      data,
    });
  }

  async count(): Promise<number> {
    return await prismaClient.user.count();
  }
}

export default PrismaUserRepository;
