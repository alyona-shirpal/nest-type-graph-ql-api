import { AuthChecker } from 'type-graphql';
import { MyContext } from '../types/myContext';
import jwt from 'jsonwebtoken';

export const authChecker: AuthChecker<MyContext> = ({ context: { req } }) => {
  const authorizationHeader: string =
    (req.headers['authorization'] as string) ||
    (req.headers['Authorization'] as string);

  if (!authorizationHeader) {
    return false;
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) return false;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
