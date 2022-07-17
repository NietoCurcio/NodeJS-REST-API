import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  findOpenRentalByCarId(carId: string): Promise<Rental>;
  findOpenRentalByUserId(userId: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  findByUserId(userId: string): Promise<Rental[]>;
}

export { IRentalsRepository };
