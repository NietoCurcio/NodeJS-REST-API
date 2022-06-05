import { CategoriesRepository } from '../repositories/CategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

// SRP - single responsability principle
class CreateCategoryService {
  /*
  private categoriesRepository: CategoriesRepository, in the constructor param
  is the same as defining a property and then called this.property = property
  */
  constructor(private categoriesRepository: CategoriesRepository) {}
  /*
  DIP - dependency inversion principle

  the service does not need to know about the DBMS, the framework express, where the data is, etc.
  Instead of the service being responsible for how to find the received name, and create an object,
  it will be inverted, and the responsibility of how to find and create some data is by who calls this service
  */

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) throw new Error('Category already exists');

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
