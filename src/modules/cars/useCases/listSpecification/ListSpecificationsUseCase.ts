import { inject, injectable } from 'tsyringe';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return await this.specificationRepository.list();
  }
}

export { ListSpecificationsUseCase };
