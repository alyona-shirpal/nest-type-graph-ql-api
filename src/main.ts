import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { BookResolver } from './resolvers/book.resolver';
import { Book } from './models/Book';
import { Author } from './models/Author';
import { AuthorResolver } from './resolvers/author.resolver';
import { Rating } from './models/Rating';
import { RatingResolver } from './resolvers/rating.resolver';
import { User } from './models/User';
import { UserResolver } from './resolvers/user.resolver';
import { LoginResolver } from './resolvers/login.resolver';
import { authChecker } from './auth/authChecker';
import * as dotenv from 'dotenv';

async function main() {
  await createConnection({
    type: 'sqlite',
    database: './db.sqlite3',
    entities: [Book, Author, User, Rating],
    synchronize: true,
  });

  dotenv.config();

  const schema = await buildSchema({
    resolvers: [
      BookResolver,
      AuthorResolver,
      UserResolver,
      RatingResolver,
      LoginResolver,
    ],
    emitSchemaFile: './schema.gql',
    authChecker,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  await server.listen(process.env.PORT || 4000);
  console.log('Server has started!');
}
main();
