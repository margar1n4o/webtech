import { Application, Router } from 'express';
import { usersController } from './users/user-controller';
import { notesController } from './notes/note-controller';

const router = Router();

export const connectAPI = (app: Application, path: string): void => {
    router.use('/users', usersController);
    router.use('/notes', notesController);

    app.use(path, router);
}