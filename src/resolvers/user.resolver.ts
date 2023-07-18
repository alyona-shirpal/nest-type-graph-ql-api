import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../models/User';
import { CreateUserInput } from '../inputs/user/createUserInput';

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    const user = User.create(data as any);
    const savedUser = await user.save();
    return savedUser;
  }
}
