import { NextApiRequest, NextApiResponse } from 'next';
import { getAllTiles, getValidSessionByToken } from '../../../util/database';

export default async function TileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    console.log('cookies', req.cookies);
    const validSession = await getValidSessionByToken(req.cookies.sessionToken);

    if (validSession) {
      const tiles = await getAllTiles(validSession.userId);
      console.log('here are the tiles', tiles);

      // Once the tiles are retrieved, return them
      return res.status(200).json(tiles);
    }
    return res.status(401);
  }
  return res.status(405);
}
