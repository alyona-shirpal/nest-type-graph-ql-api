import { Resolver, Query, Mutation, Arg, ID, Authorized } from 'type-graphql';
import { Book } from '../models/Book';
import { CreateBookInput } from '../inputs/book/CreateBookInput';
import { UpdateBookInput } from '../inputs/book/UpdateBookInput';
import { Author } from '../models/Author';

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  async books(): Promise<Book[]> {
    const books = await Book.find({ relations: ['author'] });

    for (const book of books) {
      const ratings = await book.ratings;
      if (ratings.length === 0) {
        continue;
      }
      const totalRating = ratings.reduce(
        (sum, rating) => sum + rating.value,
        0,
      );
      const avgRating = totalRating / ratings.length;
      book.averageRating = Math.round(avgRating * 100) / 100;
    }

    return books;
  }

  @Mutation(() => Book)
  async createBook(@Arg('data') data: CreateBookInput): Promise<Book> {
    const book = Book.create({
      title: data.title,
      isPublished: data.isPublished || false,
    });

    if (data.authorId) {
      const author = await Author.findOne({
        where: { id: Number(data.authorId) },
      });
      if (!author) {
        throw new Error('Author not found');
      }

      book.author = author;
    }

    const savedBook = await book.save();
    return savedBook;
  }

  @Query(() => Book)
  async book(@Arg('id') id: number): Promise<Book> {
    const book = await Book.findOne({
      where: { id: Number(id) },
      relations: ['author', 'ratings'],
    });

    if (!book) {
      throw new Error('Book not found');
    }

    const ratings = await book.ratings;

    if (ratings.length === 0) {
      return book;
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.value, 0);

    const avgRating = totalRating / ratings.length;
    book.averageRating = Math.round(avgRating * 100) / 100;

    return book;
  }

  @Authorized()
  @Mutation(() => Book)
  async updateBook(
    @Arg('id', () => ID) id: number,
    @Arg('data') data: UpdateBookInput,
  ): Promise<Book> {
    const book = await Book.findOne({ where: { id: Number(id) } });
    if (!book) throw new Error('Book not found!');
    Object.assign(book, data);
    await book.save();
    return book;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteBook(@Arg('id') id: number): Promise<boolean> {
    const book = await Book.findOne({ where: { id: Number(id) } });
    if (!book) throw new Error('Book not found!');
    await book.remove();
    return true;
  }
}
