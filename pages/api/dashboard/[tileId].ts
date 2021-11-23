import { NextApiRequest, NextApiResponse } from 'next';
import { getSingleTile } from '../../../util/database';

export default async function singleTileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const singleTile = await getSingleTile(Number(req.query.tileId));

    res.status(200).json(singleTile);
  }

  return res.status(405);
}
