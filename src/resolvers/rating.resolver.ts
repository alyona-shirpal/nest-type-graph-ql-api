import { Arg, Int, Mutation, Resolver } from 'type-graphql';
import { Rating } from '../models/Rating';
import { Book } from '../models/Book';
import { User } from '../models/User';

@Resolver()
export class RatingResolver {
  @Mutation(() => Rating)
  async addRating(
    @Arg('bookId', () => Int) bookId: number,
    @Arg('userId', () => Int) userId: number,
    @Arg('value', () => Int) value: number,
  ): Promise<Rating> {
    const book = await Book.findOne({ where: { id: Number(bookId) } });
    if (!book) throw new Error('Book is not found');

    const user = await User.findOne({ where: { id: Number(userId) } });
    if (!user) throw new Error('User is not found');

    const rating = Rating.create({
      value,
      book,
      user,
    });
    await rating.save();

    return rating;
  }
}
