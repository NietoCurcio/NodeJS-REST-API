import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
class ReturnRentalUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider') private dateProvider: IDateProvider
  ) {}

  async execute({ id, userId }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);

    if (rental.end_date) throw new AppError('Rental already returned');

    const minimunDaily = 1;

    if (!rental) throw new AppError('Rental does not exists', 404);

    const car = await this.carsRepository.findById(rental.carId);

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) daily = minimunDaily;

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    const totalDaily = daily * car.daily_rate;

    const total = delay > 0 ? delay * car.fine_amount + totalDaily : totalDaily;

    rental.end_date = dateNow;
    rental.total = total;
    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailableById(car.id, true);

    return rental;
  }
}

export { ReturnRentalUseCase };
