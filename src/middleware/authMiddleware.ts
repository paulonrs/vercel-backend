import { enumBusinessError } from '@/Error/error';
import BusinessError from '@/Error/Errors';
import User from '@/models/user/user/userModel';
import AuthenticationProvider from '@/providers/authentication/authenticationProvider';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

declare global {
  namespace Express {
    interface Request {
      userAthentication?: User;
    }
  }
}

@injectable()
export default class AuthMiddleware {
  constructor(
    @inject('AuthenticationProvider')
    private authenticationProvider: AuthenticationProvider,
  ) {}

  // Método para validar o token
  async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: 'Token não fornecido' });
      return;
    }

    try {
      const user = await this.authenticationProvider.verifyToken(token);
      if (!user) {
        throw new BusinessError(enumBusinessError.unauthorized);
      }

      // Adiciona o usuário ao objeto de request
      req.userAthentication = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  }
}
