import { InputType, Field } from 'type-graphql';
import { MaxLength, Length } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @MaxLength(150)
  title: string;

  @Field()
  authorId: number;

  @Field({ nullable: true })
  isPublished?: boolean;
}
