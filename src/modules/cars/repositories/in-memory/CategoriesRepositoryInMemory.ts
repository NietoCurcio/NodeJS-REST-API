import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((cat) => cat.name === name);
    return category;
  }

  async findById(id: string): Promise<Category> {
    const category = this.categories.find((cat) => cat.id === id);
    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const cat = new Category();
    Object.assign(cat, { name, description });
    this.categories.push(cat);
  }
}

export { CategoriesRepositoryInMemory };
