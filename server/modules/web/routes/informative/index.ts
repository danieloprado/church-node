import { Router } from 'express';
import { authRequired } from '../../../../middlewares/authRequired';
import { enRoles } from '../../../../interfaces/churchUser';
import { get } from './get';
import { list } from './list';
import { remove } from './remove';
import { save } from './save';

export const router = Router();
router.get('/', list);
router.get('/:id', get);

router.use(authRequired(enRoles.contentManager));
router.delete('/:id', remove);
router.post('/', save);