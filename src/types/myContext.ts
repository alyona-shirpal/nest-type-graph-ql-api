import { Request } from 'express';
import session from 'express-session';

export interface MyContext {
  req: Request & { session?: session.Session };
}
