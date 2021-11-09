import crypto from 'node:crypto';
import Tokens from 'csrf';
import { NextApiRequest, NextApiResponse } from 'next';
// bcrypt
import { generateCsrfSecretByToken, hashPassword } from '../../util/auth';
import { createSerializedSessionTokenCookie } from '../../util/cookies';
import {
  createSession,
  createUser,
  deleteExpiredSessions,
  deleteSessionByToken,
  getValidSessionByToken,
} from '../../util/database';
import { Errors, User } from '../../util/types';

const tokens = new Tokens();

export type RegisterResponse =
  | {
      user: User;
    }
  | { errors: Errors[] };

// An API Route needs to define the response
// that is returned to the user
export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>,
) {
  if (req.method === 'POST') {
    // Retrieve csrfToken, etc. from the request body from the frontend
    // Destructure relevant information from the request body
    const { firstName, lastName, username, email, password, csrfToken } =
      req.body;

    const sessionToken = req.cookies.sessionTokenRegister;

    const registerSession = await getValidSessionByToken(sessionToken);

    if (!registerSession) {
      return res.status(400).json({
        errors: [
          {
            field: 'invalidSession',
            message: 'Username taken. Please choose a different username.',
          },
        ],
      });
    }

    const csrfSecret = generateCsrfSecretByToken(sessionToken);
    const isCsrfTokenValid = tokens.verify(csrfSecret, csrfToken);

    if (!isCsrfTokenValid) {
      return res.status(400).json({
        errors: [
          { field: 'csrfTokenMatching', message: 'CSRF token does not match' },
        ],
      });
    }

    await deleteSessionByToken(sessionToken);

    const passwordHash = await hashPassword(req.body.password);

    const user = await createUser(
      firstName,
      lastName,
      username,
      email,
      passwordHash,
    );

    await deleteExpiredSessions();

    // Token creation, serves as record for correct user login
    const token = crypto.randomBytes(64).toString('base64');

    // Save token to DB, expires after 24h
    const session = await createSession(token, user.id);

    const cookie = createSerializedSessionTokenCookie(session.token);

    return res.status(200).setHeader('Set-Cookie', cookie).json({ user: user });
  }

  res
    .status(400)
    .json({ errors: [{ field: 'badRequest', message: 'Bad request' }] });
}
