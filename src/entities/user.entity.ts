import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  cognitoId: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user'
  })
  role: 'admin' | 'user';
}
