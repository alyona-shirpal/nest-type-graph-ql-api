import { ObjectType, ID, Field } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Rating } from './Rating';
import { IsEmail } from 'class-validator';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column('text', { unique: true })
  @IsEmail()
  email: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => [Rating])
  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Promise<Rating[]>;
}
