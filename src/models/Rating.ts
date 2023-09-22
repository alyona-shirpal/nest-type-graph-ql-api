import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Book } from './Book';
import { User } from './User';

@Entity()
@ObjectType()
export class Rating extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  value: number;

  @Field(() => Book)
  @ManyToOne(() => Book, (book) => book.ratings)
  book: Book;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ratings)
  user: User;
}
