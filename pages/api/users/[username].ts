import { NextApiRequest, NextApiResponse } from 'next';
import { convertQueryValueString } from '../../../util/context';
import {
  deleteUserByUserUsername,
  getUserByUsernameAndToken,
} from '../../../util/database';
import { Errors, User } from '../../../util/types';

export type SingleUserResponseType =
  | { user: User | null }
  | { errors: Errors[] };

export default async function singleUserHandler(
  req: NextApiRequest,
  res: NextApiResponse<SingleUserResponseType>,
) {
  // Retrieve username from query string
  const username = convertQueryValueString(req.query.username);

  // Retrieve session token from cookie (forwarded from frontend in gSSP)
  const token = convertQueryValueString(req.cookies.sessionToken);

  // Get an array of errors or a specific user
  const result = await getUserByUsernameAndToken(username, token);

  // Delete user
  if (req.method === 'DELETE') {
    if (username) {
      await deleteUserByUserUsername(username);
    }
  }

  // Response to array of errors
  if (Array.isArray(result)) {
    return res.status(403).json({ errors: result });
  }

  // Retrieved user successfully
  return res.status(200).json({ user: result || null });
}
