import { Container } from 'inversify';
import UserController from '../../controllers/user/userController';
import UserService from '../../services/user/userService';
import UserBusiness from '@/business/user/userBusiness';
import UserServiceInterface from '@/services/user/userServiceInterface';
import UserBusinessInterface from '@/business/user/userBusinessInterface';
import UserControllerInterface from '@/controllers/user/userControllerInterface';
import PrismaUserRepository from '@/repository/user/prismaUserRepository';
import UserRepositoryInterface from '@/repository/user/userRepositoryInterface';

const container = new Container();
container.bind<UserControllerInterface>(UserController).to(UserController);
container.bind<UserBusinessInterface>(UserBusiness).to(UserBusiness);
container.bind<UserServiceInterface>(UserService).to(UserService);
container
  .bind<UserRepositoryInterface>(PrismaUserRepository)
  .to(PrismaUserRepository);

export { container };
