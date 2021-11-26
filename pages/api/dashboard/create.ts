import { NextApiRequest, NextApiResponse } from 'next';
import { insertTile } from '../../../util/database';
import { Errors, User } from '../../../util/types';

export type CreateTileResponse =
  | {
      tile: any;
      user?: User;
    }
  | { errors: Errors[] };

export default async function createTileHandler(
  req: NextApiRequest,
  res: NextApiResponse<CreateTileResponse>,
) {
  if (req.method === 'POST') {
    // testing request
    // console.log(req.body);
    // Retrieve entries from the request body from frontend
    try {
      const insertedTile = await insertTile({
        userId: req.body.userId,
        day: req.body.day,
        moodId: req.body.moodId,
        achievements: req.body.achievements,
        gratitude: req.body.gratitude,
      });
      if (!insertedTile) {
        res.status(404).send({
          errors: [
            {
              field: 'UploadError',
              message: 'Tile could not be uploaded, try again',
            },
          ],
        });
        return;
      }
      return res.status(200).send({ tile: insertedTile });
    } catch {
      res.status(404).send({
        errors: [
          {
            field: 'UploadFail',
            message: 'Some problems occurred with your upload',
          },
        ],
      });
      return;
    }
  }

  return res.status(405);
}
