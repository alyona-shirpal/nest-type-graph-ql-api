import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Book } from '../models/Book';
import { CreateBookInput } from '../inputs/CreateBookInput';

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  async books() {
    const books = await Book.find();
    return books;
  }

  @Mutation(() => Book)
  async createBook(@Arg('data') data: CreateBookInput) {
    const book = Book.create(data as any);
    const savedBook = await book.save();
    return savedBook;
  }

  @Query(() => Book)
  book(@Arg('id') id: string) {
    return Book.findOne({ where: { id } });
  }
}
