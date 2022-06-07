import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

// SRP - single responsibility principle, create a category
class CreateCategoryService {
  /*
  LSP, Liskov substituion principle:
  states that any subclass object should be substitutable
  for the superclass object from which it is derived

  private categoriesRepository: ICategoriesRepository
  
  it's about interfaces and contracts, categoriesRepository is a subtype of ICategoriesRepository.
  Note that this is related to dependency inversion, since if we need to change categoriesRepository to
  PostgresCategoriesRepository or Mongo, since these classes implement ICategoriesRepository (LSP),
  we would just have to pass the right subtype when calling the Service constructor (the responsibility of
  using the proper subtype is not by the service, but actually by who calls the service passing
  the proper subtype implemented (DIP)).
  */

  /*
  private categoriesRepository: CategoriesRepository, in the constructor as a param in Typescript
  is the same as defining a property and then defining this.property = property in the constructor
  */
  constructor(private categoriesRepository: ICategoriesRepository) {}
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
