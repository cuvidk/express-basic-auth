import express, { Request, Response } from 'express';
import { getAllUsers, deleteUser } from '../services/user';
import { buildApiResponse } from '../common/api-response';

const router = express.Router();

router.get('/', (req: Request, res: Response): void => {
  const users = getAllUsers();
  res.send(buildApiResponse({ users }));
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).send(buildApiResponse({ statusCode: 400, message: 'Id parameter is required' }));
  const user = deleteUser(id);
  if (!user)
    return res.status(404).send(buildApiResponse({ statusCode: 404, message: 'Cannot detele non-existing user' }));
  res.send(buildApiResponse({ user }));
});

export default router;
