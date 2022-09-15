import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';
import { instanceToInstance } from 'class-transformer';

class UserMap {
  static toDTO({
    email,
    name,
    id,
    driver_license,
    avatar,
    avatar_url,
  }: User): IUserResponseDTO {
    return instanceToInstance({
      email,
      name,
      id,
      driver_license,
      avatar,
      avatar_url,
    });
  }
}

export { UserMap };
