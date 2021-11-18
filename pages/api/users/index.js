import { getUserById } from '../../../util/database';

export default async function SingleUser(req, res) {
  if (req.method === 'GET') {
    const user = await getUserById(req.query.userId);
    res.status(200).json({ user: user || null });
  }
  res.status(400).json(null);
}
