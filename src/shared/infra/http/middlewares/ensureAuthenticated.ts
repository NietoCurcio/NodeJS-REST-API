import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest extends Request {
  user: {
    id: string;
  };
}

export async function ensureAuthenticated(
  request: IRequest,
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

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exists', 401);

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
