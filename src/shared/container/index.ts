import { Container } from 'inversify';
import UserController from '../../controllers/user/userController';
import UserService from '../../services/user/userService';
import UserBusiness from '@/business/user/userBusiness';
import UserServiceInterface from '@/services/user/userServiceInterface';
import UserBusinessInterface from '@/business/user/userBusinessInterface';
import UserControllerInterface from '@/controllers/user/userControllerInterface';
import UserRepositoryInterface from '@/repository/user/userRepositoryInterface';
import PrismaUserRepository from '@/repository/user/prismaUserRepository';
import AuthMiddleware from '@/middleware/authMiddleware';
import AuthenticationProvider from '@/providers/authentication/authenticationProvider';

export class DiContainer {
  private container: Container;

  constructor() {
    this.container = new Container();
    this.configureContainer();
  }

  public getContainer(): Container {
    if (!this.container) {
      this.container = new Container();
    }
    return this.container;
  }

  private configureContainer(): void {
    this.container
      .bind<UserControllerInterface>('UserControllerInterface')
      .to(UserController);
    this.container
      .bind<UserBusinessInterface>('UserBusinessInterface')
      .to(UserBusiness);
    this.container
      .bind<UserServiceInterface>('UserServiceInterface')
      .to(UserService);
    this.container
      .bind<UserRepositoryInterface>('UserRepositoryInterface')
      .to(PrismaUserRepository);

    this.container.bind<AuthMiddleware>('AuthMiddleware').to(AuthMiddleware);

    this.container
      .bind<AuthenticationProvider>('AuthenticationProvider')
      .to(AuthenticationProvider);
  }
}
