import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { BookResolver } from './resolvers/book.resolver';
import { Book } from './models/Book';
import { Author } from './models/Author';
import { AuthorResolver } from './resolvers/author.resolver';
import { User } from './models/User';
import { Rating } from './models/Rating';
import { UserResolver } from './resolvers/user.resolver';
import { RatingResolver } from './resolvers/rating.resolver';

async function main() {
  await createConnection({
    type: 'sqlite',
    database: './db.sqlite3',
    entities: [Book, Author, User, Rating],
    synchronize: true,
  });

  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver, UserResolver, RatingResolver],
    emitSchemaFile: './schema.gql',
  });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log('Server has started!');
}
main();
