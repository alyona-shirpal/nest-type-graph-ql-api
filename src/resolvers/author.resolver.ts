import { Mutation, Resolver, Arg, Query } from 'type-graphql';
import { Author } from '../models/Author';
import { CreateAuthorInput } from '../inputs/author/createAuthorInput';

@Resolver()
export class AuthorResolver {
  @Mutation(() => Author)
  async createAuthor(@Arg('data') data: CreateAuthorInput): Promise<Author> {
    const author = Author.create(data as any);
    const saveAuthor = await author.save();
    return saveAuthor;
  }

  @Query(() => Author, { nullable: true })
  async author(@Arg('id') id: string): Promise<Author> {
    return Author.findOne({ where: { id } });
  }
}
