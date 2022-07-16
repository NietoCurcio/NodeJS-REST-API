import { Category } from '../infra/typeorm/entities/Category';
import { Specification } from '../infra/typeorm/entities/Specification';

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category: Category;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCarDTO };
