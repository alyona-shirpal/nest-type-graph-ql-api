import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';
import { Book } from '../models/Book';
import { CreateBookInput } from '../inputs/book/CreateBookInput';
import { UpdateBookInput } from '../inputs/book/UpdateBookInput';
import { Author } from '../models/Author';

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  async books() {
    const books = await Book.find();
    return books;
  }

  @Mutation(() => Book)
  async createBook(@Arg('data') data: CreateBookInput) {
    const book = Book.create({
      title: data.title,
      isPublished: data.isPublished || false,
    });

    if (data.author) {
      const author = await Author.findOne({ where: { id: data.author } });
      if (!author) {
        throw new Error('Author not found');
      }

      book.author = author;
    }

    const savedBook = await book.save();
    return savedBook;
  }

  @Query(() => Book)
  async book(@Arg('id') id: string) {
    return Book.findOne({ where: { id } });
  }

  @Mutation(() => Book)
  async updateBook(
    @Arg('id', () => ID) id: string,
    @Arg('data') data: UpdateBookInput,
  ) {
    const book = await Book.findOne({ where: { id } });
    if (!book) throw new Error('Book not found!');
    Object.assign(book, data);
    await book.save();
    return book;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg('id') id: string) {
    const book = await Book.findOne({ where: { id } });
    if (!book) throw new Error('Book not found!');
    await book.remove();
    return true;
  }
}
