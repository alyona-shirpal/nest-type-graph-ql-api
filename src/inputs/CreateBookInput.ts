import { InputType, Field } from 'type-graphql';
import { MaxLength, Length } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @MaxLength(150)
  title: string;

  @Field()
  @Length(3, 255)
  author: string;

  @Field({ nullable: true })
  isPublished?: boolean;
}
