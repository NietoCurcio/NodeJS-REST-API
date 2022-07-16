import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface findAvailableParams {
  brand?: string;
  categoryId?: string;
  name?: string;
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(findAvailableParams): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarsRepository };
