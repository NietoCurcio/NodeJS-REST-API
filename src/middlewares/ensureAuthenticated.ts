import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

export async function ensureAuthenticated(
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

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exists', 401);

    next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
