import crypto from 'node:crypto';
import argon2 from 'argon2';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedSessionTokenCookie as createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  deleteExpiredSessions,
  getUserWithPasswordHashByUsername,
} from '../../util/database';
import { Errors, User } from '../../util/types';

export type LoginResponse = { user: User } | { errors: Errors[] };

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>,
) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const userWithPasswordHash = await getUserWithPasswordHashByUsername(
      username,
    );

    // Username doesn't match anything in the database
    if (!userWithPasswordHash) {
      return res.status(401).json({
        errors: [
          {
            field: 'usernameNotInDatabase',
            message: 'Invalid login, please try again.',
          },
        ],
      });
    }

    const isPasswordVerified = await argon2.verify(
      userWithPasswordHash.passwordHash,
      password,
    );

    // Password doesn't match hash in the database
    if (!isPasswordVerified) {
      return res.status(401).json({
        errors: [
          {
            field: 'passwordHashMismatch',
            message: 'Invalid login, please try again.',
          },
        ],
      });
    }

    // clean old sessions
    await deleteExpiredSessions();

    // Create the record in the sessions table with a new token

    // 1. create the token
    const token = crypto.randomBytes(64).toString('base64');

    // 2. do a DB query to add the session record
    const newSession = await createSession(token, userWithPasswordHash.id);

    // 3. set the response to create the cookie in the browser
    const cookie = createSerializedRegisterSessionTokenCookie(newSession.token);

    // Important! Removing the password
    // hash from the response sent back
    // to the user
    const { passwordHash, ...user } = userWithPasswordHash;

    return res.status(200).setHeader('Set-Cookie', cookie).json({ user: user });
  }

  res
    .status(500)
    .json({ errors: [{ field: 'badRequest', message: 'Bad request' }] });
}
