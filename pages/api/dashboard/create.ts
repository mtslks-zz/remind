import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserById,
  getValidSessionByToken,
  insertTile,
} from '../../../util/database';
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
    console.log(req.body);
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

//     // Declare variables for form validation
//     const responseErrorObject: Errors[] = [];
//     let responseStatusCode: number = 200;

//     // Save the tile information to the database
//     let tile;

//       const user = await getUserById(tile?.userId);

//       // Send response to frontend
//       if (responseErrorObject.length > 0) {
//         // If there are errors, return status code and errors to frontend
//         return res
//           .status(responseStatusCode)
//           .json({ errors: [responseErrorObject] });
//       } else {
//         // Return tile info and user response to frontend
//         return res.status(200).json({
//           tile: tile,
//           user: user,
//           errors: [],
//         });
//       }
//     }
//   }
// }
