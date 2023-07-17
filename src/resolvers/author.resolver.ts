import { Mutation, Resolver, Arg, Query } from 'type-graphql';
import { Author } from '../models/Author';
import { CreateAuthorInput } from '../inputs/author/createAuthorInput';

@Resolver()
export class AuthorResolver {
  @Mutation(() => Author)
  async createAuthor(@Arg('data') data: CreateAuthorInput) {
    const author = Author.create(data as any);
    const saveAuthor = await author.save();
    return saveAuthor;
  }

  @Query(() => Author)
  async author(@Arg('id') id: string) {
    return Author.findOne({ where: { id } });
  }
}
