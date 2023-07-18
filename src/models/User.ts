import { ObjectType, ID, Field } from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Rating } from './Rating';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => [Rating])
  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Promise<Rating[]>;
}
