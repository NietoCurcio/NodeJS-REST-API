import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Car)
  car: Car;

  @Column()
  carId: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
