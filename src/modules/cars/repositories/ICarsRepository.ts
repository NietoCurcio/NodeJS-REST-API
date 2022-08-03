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
  findAvailable({
    categoryId,
    brand,
    name,
  }: findAvailableParams): Promise<Car[]>;
  findAvailableById(id: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  updateAvailableById(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
