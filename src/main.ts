import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { BookResolver } from './resolvers/bookResolver';
import { Book } from './models/Book';

async function main() {
  await createConnection({
    type: 'sqlite',
    database: './db.sqlite3',
    entities: [Book],
    synchronize: true,
  });

  const schema = await buildSchema({
    resolvers: [BookResolver],
    emitSchemaFile: './schema.gql',
  });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log('Server has started!');
}
main();
