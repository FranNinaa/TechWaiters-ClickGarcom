import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.listen(4444, () => console.log('Server is running on port 4444'));