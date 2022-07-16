import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Car } from './Car';

@Entity('car_images')
class CarImage {
  @PrimaryColumn()
  carId: string;

  @PrimaryColumn()
  image_name: string;

  @ManyToOne(() => Car, (car) => car.images)
  car: Car;

  @CreateDateColumn()
  created_at: Date;
}

export { CarImage };
