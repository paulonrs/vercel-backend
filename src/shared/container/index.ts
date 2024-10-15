import { Container } from 'inversify';
import UserController from '../../controllers/userController/userController';
import UserService from '../../services/userService/userService';

const container = new Container();
container.bind<UserService>(UserService).to(UserService);
container.bind<UserController>(UserController).to(UserController);

export { container };
