import { Router } from 'express';
import { register } from './register';

export const router = Router({ mergeParams: true });

router.post('/', register);