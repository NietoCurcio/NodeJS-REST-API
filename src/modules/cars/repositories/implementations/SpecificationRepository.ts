import { Repository } from 'typeorm';
import { PostgresDataSource } from '../../../../database';
import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ description, name });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOneBy({ name });
    return specification;
  }

  async list(): Promise<Specification[]> {
    const specifications = this.repository.find();
    return specifications;
  }
}

export { SpecificationRepository };
