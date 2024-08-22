import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { join } from 'path';
import { User } from '../entities/user.entity';
const parentDir = join(__dirname, '..');

const connectionOpts: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'postgres',
  entities: [
    User
  ],
  synchronize: true
};

const connection:Promise<Connection> = createConnection(connectionOpts);

export default connection;