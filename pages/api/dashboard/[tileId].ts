import { NextApiRequest, NextApiResponse } from 'next';
import { deleteTileByTileId, getTileByTileId } from '../../../util/database';

export default async function singleTileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const tileId = req.query.tileId;

  if (req.method === 'GET') {
    const tile = await getTileByTileId(tileId);
    return res.status(200).json({ tile: tile || null });
  } else if (req.method === 'DELETE') {
    const tile = await deleteTileByTileId(tileId);
    return res.status(200).json({ tile: tile || null });
  }

  res.status(400).json(null);
}
