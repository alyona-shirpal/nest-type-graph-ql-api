import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../models/User';
import { CreateUserInput } from '../inputs/user/createUserInput';
import * as bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = User.create(data as any);
    const savedUser = await user.save();
    return savedUser;
  }
}
