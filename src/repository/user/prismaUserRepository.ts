import { Prisma } from '@prisma/client/edge';
import { prismaClient } from '../../database/prismaClient';
import User from '../../models/user/user/userModel';
import UserRepositoryInterface from './userRepositoryInterface';
import { injectable } from 'inversify';
import PaginationModel from '@/models/pagination/paginationModel';

@injectable()
class PrismaUserRepository implements UserRepositoryInterface {
  async findAll(): Promise<User[]> {
    return await prismaClient.user.findMany();
  }

  findAllWithPagination(paginationModel: PaginationModel): Promise<User[]> {
    return prismaClient.user.findMany({
      skip:
        paginationModel.page * paginationModel.limit - paginationModel.limit,
      take: paginationModel.limit,
      where: {
        OR: [
          { name: { contains: paginationModel.search } },
          { email: { contains: paginationModel.search } },
        ],
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

  getByModel(data: Partial<User>): Promise<User | null> {
    return prismaClient.user.findFirst({
      where: {
        OR: [data],
      },
    });
  }
}

export default PrismaUserRepository;
