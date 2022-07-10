import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';

class AuthGuards {
  async authenticated(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) throw new AppError('Token missing', 401);

      const [, token] = authHeader.split(' ');

      const { sub: user_id } = verify(
        token,
        process.env.JWT_SECRET_KEY
      ) as JwtPayload;

      const usersRepository = container.resolve(UsersRepository);
      const user = await usersRepository.findById(user_id);

      if (!user) throw new AppError('User does not exists', 401);

      request.user = {
        id: user_id,
      };

      next();
    } catch (err) {
      throw err;
    }
  }

  async administrator(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.user;

      const usersRepository = container.resolve(UsersRepository);
      const user = await usersRepository.findById(id);

      if (!user.isAdmin) throw new AppError("User isn't admin", 401);

      return next();
    } catch (err) {
      throw err;
    }
  }
}

export { AuthGuards };
