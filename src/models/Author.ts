import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Book } from './Book';

@Entity()
@ObjectType()
export class Author extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  email: string;

  @Field(() => [Book])
  @OneToMany(() => Book, (book) => book.author)
  books: Promise<Book[]>;
}
