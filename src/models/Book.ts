import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { BaseEntity } from 'typeorm';
import { Author } from './Author';

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => Author)
  @ManyToOne(() => Author, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Field(() => Boolean)
  @Column({ default: false })
  isPublished: boolean;
}
