import { Category } from '../infra/typeorm/entities/Category';

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category: Category;
}

export { ICreateCarDTO };
