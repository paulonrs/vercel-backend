import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { BaseController } from '../baseController';
import UserControllerInterface from './userControllerInterface';
import UserBusinessInterface from '@/business/user/userBusinessInterface';
import UserBusiness from '@/business/user/userBusiness';
import { returnStatus } from '@/helpers/api_retorn';

@injectable()
class UserController extends BaseController implements UserControllerInterface {
  constructor(
    @inject(UserBusiness) private userBusiness: UserBusinessInterface,
  ) {
    super();
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || '';

      const { data, total } = await this.userBusiness.findAllWithPagination(
        page,
        limit,
        search,
      );

      const response = this.buildApiResponse(
        data,
        'Usuários obtidos com sucesso',
        total,
      );

      res.status(returnStatus.Success).send(response);
    } catch (error: any) {
      res.status(returnStatus.BadRequest).send({ message: error.message });
    }
  };

  addUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userBusiness.addUser(req.body);
      res.send(users);
    } catch (error: any) {
      res.status(returnStatus.BadRequest).send({ message: error.message });
    }
  };

  editUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userBusiness.editUser(req.body);
      res.send(users);
    } catch (error: any) {
      res.status(returnStatus.BadRequest).send({ message: error.message });
    }
  };

  inactiveUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userBusiness.inactive(req.body);
      res.send(users);
    } catch (error: any) {
      res.status(returnStatus.BadRequest).send({ message: error.message });
    }
  };

  activeUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userBusiness.active(req.body);
      res.send(users);
    } catch (error: any) {
      res.status(returnStatus.BadRequest).send({ message: error.message });
    }
  };
}

export default UserController;
