import { Router } from 'express';

import { answer } from './answer';

export const router = Router({ mergeParams: true });

router.post('/', answer);