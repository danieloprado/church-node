import { Router } from 'express';

import { enRoles } from '../../../../interfaces/churchUser';
import { authRequired } from '../../../../middlewares/authRequired';
import { list } from './list';
import { remove } from './remove';
import { save } from './save';
import { types } from './types';

export const router = Router({ mergeParams: true });

router.get('/types', types);

router.use(authRequired(enRoles.churchReport));
router.get('/', list);
router.post('/', save);
router.delete('/:id', remove);