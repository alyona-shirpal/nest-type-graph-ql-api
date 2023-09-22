import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { BaseEntity } from 'typeorm';
import { Author } from './Author';
import { Rating } from './Rating';
import { User } from './User';

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.books)
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Field(() => Boolean)
  @Column({ default: false })
  isPublished: boolean;

  @Field(() => [Rating])
  @OneToMany(() => Rating, (rating) => rating.book)
  ratings: Promise<Rating[]>;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.ratings)
  @JoinTable()
  users: Promise<User[]>;

  @Field({ nullable: true })
  averageRating?: number;
}
