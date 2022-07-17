import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  userId: string;
  carId: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider') private dateProvider: IDateProvider
  ) {}

  async execute({
    carId,
    userId,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHours = 24;

    const isCarInOpenRental =
      await this.rentalsRepository.findOpenRentalByCarId(carId);

    if (isCarInOpenRental) throw new AppError('Car unavailable');

    const isUserInOpenRental =
      await this.rentalsRepository.findOpenRentalByUserId(userId);

    if (isUserInOpenRental)
      throw new AppError("There's an unclosed rent for the user");

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minimumHours) throw new AppError('Invalid return date');

    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
