import { Request, Response } from 'express';

import { BaseController } from '../baseController';

import UserServiceInterface from '../../services/userService/userServiceInterface';
import UserControllerInterface from './userControllerInterface';
import UserService from '../../services/userService/userService';
import { inject, injectable } from 'inversify';

@injectable()
class UserController extends BaseController implements UserControllerInterface {
  constructor(@inject(UserService) private userService: UserServiceInterface) {
    super();
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.send(users);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  };
}

export default UserController;
