import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from 'type-graphql';
import { Rating } from '../models/Rating';
import { Book } from '../models/Book';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { MyContext } from '../types/myContext';

@Resolver()
export class RatingResolver {
  @Authorized()
  @Mutation(() => Rating)
  async addRating(
    @Arg('bookId', () => Int) bookId: number,
    @Arg('value', () => Int) value: number,
    @Ctx() context: MyContext,
  ): Promise<Rating> {
    const token = context.req.headers.authorization;

    if (!token) {
      throw new Error('Authorization token not provided');
    }

    const splitToken = token.split(' ')[1];

    const { userId } = jwt.verify(splitToken, process.env.JWT_SECRET) as {
      userId: number;
    };

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
