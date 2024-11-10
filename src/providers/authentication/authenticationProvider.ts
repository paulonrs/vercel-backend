import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { inject, injectable } from 'inversify';
import UserRepositoryInterface from '@/repository/user/userRepositoryInterface';
import { BusinessError, enumBusinessError } from '@/Error/error';
import { UserResponse } from '@/models/response';
import User from '@/models/user/user/userModel';

dotenv.config();

@injectable()
class AuthenticationProvider {
  private JWT_SECRET: string = process.env.KEY_SECRET || 'default_key';
  authenticated: boolean;

  constructor(
    @inject('UserRepositoryInterface')
    private userRepository: UserRepositoryInterface,
  ) {
    this.authenticated = false;
  }

  login() {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  generateToken(payload: any): string {
    return jwt.sign(JSON.stringify(payload), this.JWT_SECRET);
  }

  decodeToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error(enumBusinessError.unauthorized);
    }
  }

  generateSalt(): number {
    const saltRounds = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
    return saltRounds;
  }

  async generateHash(password: string, saltRounds: number): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  async verifyToken(token: string): Promise<User | null> {
    const decoded = this.decodeToken(token);
    if (!decoded) {
      throw new Error(enumBusinessError.unauthorized);
    }
    const userTokenReturn = decoded as User;

    if (userTokenReturn == null || userTokenReturn.email == null) {
      throw new Error(enumBusinessError.unauthorized);
    }

    const userDb: User | null = await this.userRepository.getByModel({
      email: userTokenReturn.email,
      password: userTokenReturn.password,
    });

    if (!userDb || userDb === userTokenReturn) {
      throw new Error(enumBusinessError.unauthorized);
    }
    return userDb;
  }

  async verifyTokenUsingUser(authorization: string, user: User | null = null) {
    const userReturn = await this.verifyToken(authorization);
    if (!userReturn) {
      throw new BusinessError(enumBusinessError.unauthorized);
    }

    if (user) {
      if (userReturn.email !== user.email) {
        throw new BusinessError(enumBusinessError.unauthorized);
      }
    }
    return;
  }
}

export default AuthenticationProvider;
