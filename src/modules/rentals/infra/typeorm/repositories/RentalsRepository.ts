import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { PostgresDataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Rental);
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental> {
    const rental = await this.repository
      .createQueryBuilder('rental')
      .where('rental.carId = :carId', { carId })
      .andWhere('rental.end_date IS null')
      .getOne();

    return rental;
  }

  async findOpenRentalByUserId(userId: string): Promise<Rental> {
    const rental = await this.repository
      .createQueryBuilder('rental')
      .where('rental.userId = :userId', { userId })
      .andWhere('rental.end_date IS null')
      .getOne();

    return rental;
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  async findByUserId(userId: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { userId },
      relations: {
        car: true,
      },
    });

    return rentals;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { id } });
    return rental;
  }
}

export { RentalsRepository };
