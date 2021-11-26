import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteTileByTileId,
  getSingleTile,
  getValidSessionByToken,
} from '../../../util/database';

export default async function singleTileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const validSession = await getValidSessionByToken(req.cookies.sessionToken);

  if (req.method === 'GET') {
    const singleTile = await getSingleTile(Number(req.query.tileId));

    res.status(200).json(singleTile);
  }

  // deleting a single tile
  if (req.method === 'DELETE') {
    if (!validSession.userId) {
      return res.status(403).json({
        errors: [{ field: 'validSession', message: 'No valid session' }],
      });
    } else {
      await deleteTileByTileId(validSession.userId);
    }
  }

  return res.status(405);
}
