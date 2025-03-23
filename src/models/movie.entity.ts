import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column()
    title!: string;

  @Column()
    year!: number;

  @Column()
    studios!: string;

  @Column()
    producers!: string;

  @Column({ default: false })
    winner!: boolean;
}