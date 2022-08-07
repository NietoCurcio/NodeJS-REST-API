import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['rentx-refresh-token'] ||
      request.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const tokenResponse = await refreshTokenUseCase.execute(token);

    return response.json(tokenResponse);
  }
}

export { RefreshTokenController };
