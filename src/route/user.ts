import express, { Request, Response } from 'express';

const router = express.Router();

function* userId() {
  let id = 0;
  while (true) {
    yield id;
    id++;
  }
}

const users = [
  { id: userId().next().value, name: 'Johnny', age: 20 },
  { id: userId().next().value, name: 'Doe', age: 24 },
  { id: userId().next().value, name: 'Daniel', age: 36 },
];

router.get('/', (req: Request, res: Response): void => {
  res.send(users);
});

export default router;
