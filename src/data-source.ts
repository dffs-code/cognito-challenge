import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'mydatabase',
  entities: [User],
  synchronize: true,
});
