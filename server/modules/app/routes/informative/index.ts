import { Router } from 'express';
import { get } from './get';
import { list } from './list';

export const router = Router({ mergeParams: true });

router.get('/:id', get);
router.get('/', list);