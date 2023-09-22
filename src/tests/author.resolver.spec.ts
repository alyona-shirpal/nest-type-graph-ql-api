import 'reflect-metadata';

import { Test, TestingModule } from '@nestjs/testing';
import { AuthorResolver } from '../resolvers/author.resolver';
import { Author } from '../models/Author';
import { CreateAuthorInput } from '../inputs/author/createAuthorInput';
import { createConnection } from 'typeorm';

describe('AuthorResolver', () => {
  let authorResolver: AuthorResolver;

  beforeEach(async () => {
    await createConnection({
      type: 'sqlite',
      database: './db.sqlite3',
      entities: [Author],
      synchronize: true,
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorResolver],
    }).compile();

    authorResolver = module.get<AuthorResolver>(AuthorResolver);
  });

  it('should be defined', () => {
    expect(authorResolver).toBeDefined();
  });

  describe('createAuthor', () => {
    it('should create an author', async () => {
      const createAuthorInput: CreateAuthorInput = {
        name: 'Arturitto',
        email: 'email_arturito@gmail.com',
      };

      const createdAuthor: Author = await authorResolver.createAuthor(
        createAuthorInput,
      );

      // Add your assertions to check if the author was created successfully
      expect(createdAuthor).toBeDefined();
      expect(createdAuthor.name).toBe(createAuthorInput.name);
    });
  });
});
