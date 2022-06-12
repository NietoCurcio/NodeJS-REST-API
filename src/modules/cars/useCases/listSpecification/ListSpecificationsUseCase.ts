import { inject, injectable } from 'tsyringe';
import { Specification } from '../../entities/Specification';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

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
