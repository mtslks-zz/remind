import { NextApiRequest, NextApiResponse } from 'next';
import { getUserBySessionToken } from '../../util/database';

export default async function profileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sessionToken = req.cookies.sessionToken;
  const user = await getUserBySessionToken(sessionToken);
  res.status(200).json({ user: user });
}
