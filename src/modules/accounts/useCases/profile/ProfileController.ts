import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProfileUseCase } from './ProfileUseCase';

class ProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const profileUseCase = container.resolve(ProfileUseCase);

    const user = profileUseCase.execute(id);

    return response.json(user);
  }
}

export { ProfileController };
