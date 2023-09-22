import { Field, InputType } from 'type-graphql';
import { MaxLength, Length } from 'class-validator';

@InputType()
export class UpdateBookInput {
  @Field({ nullable: true })
  @Length(3, 255)
  authorId?: string;

  @Field({ nullable: true })
  @MaxLength(150)
  title?: string;

  @Field({ nullable: true })
  isPublished?: boolean;
}
