import { Field, InputType } from 'type-graphql';
import { IsEmail, MaxLength } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @Field()
  @MaxLength(250)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}
