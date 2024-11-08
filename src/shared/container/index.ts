import { Container } from 'inversify';
import UserController from '../../controllers/userController/userController';
import UserService from '../../services/userService/userService';
import UserBusiness from '@/business/user/userBusiness';
import UserServiceInterface from '@/services/userService/userServiceInterface';
import UserBusinessInterface from '@/business/user/userBusinessInterface';
import UserControllerInterface from '@/controllers/userController/userControllerInterface';

const container = new Container();
container.bind<UserServiceInterface>(UserService).to(UserService);
container.bind<UserBusinessInterface>(UserBusiness).to(UserBusiness);
container.bind<UserControllerInterface>(UserController).to(UserController);

export { container };
