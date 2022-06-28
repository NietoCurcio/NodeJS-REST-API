import { inject, injectable } from 'tsyringe';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return await this.specificationRepository.list();
  }
}

export { ListSpecificationsUseCase };
