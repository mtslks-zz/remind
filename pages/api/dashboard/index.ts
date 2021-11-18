import { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllTiles,
  getTilesByValidSessionUser,
  getValidSessionByToken,
} from '../../../util/database';

export default async function singleTileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const allTiles = await getAllTiles();

  const validSession = await getValidSessionByToken(req.cookies.sessionToken);
  console.log('req.cookies', req.cookies.sessionToken);
  console.log('validSession', validSession);
  const isSessionValid = validSession ? true : false;
  console.log('isSessionValid', isSessionValid);

  let allTilesByValidSessionUser;

  // Check if valid session is defined
  if (validSession) {
    // Retrieve jobs of valid session user
    allTilesByValidSessionUser = await getTilesByValidSessionUser(
      validSession.userId,
    );
  } else {
    // return res.status(404).json({ errors: [{ message: 'No valid session.' }] });
  }

  // If we've successfully retrieved the jobs, return them
  return res.status(200).json({
    allTiles: allTiles,
    isSessionValid: isSessionValid,
    allTilesByValidSessionUser: allTilesByValidSessionUser,
  });
}
