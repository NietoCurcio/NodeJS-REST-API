import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCarId(carId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.carId === carId && !rental.end_date
    );
  }

  async findOpenRentalByUserId(userId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.userId === userId && !rental.end_date
    );
  }

  async create({
    carId,
    userId,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      carId,
      userId,
      expected_return_date,
      start_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findByUserId(userId: string): Promise<Rental[]> {
    const rentals = this.rentals.filter((rental) => rental.userId === userId);
    return rentals;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);
    return rental;
  }
}

export { RentalsRepositoryInMemory };
