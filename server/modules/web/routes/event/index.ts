import { enRoles } from '../../../../interfaces/churchUser';
import { authRequired } from '../../../../middlewares/authRequired';
import { get } from './get';
import { list } from './list';
import { remove } from './remove';
import { save } from './save';
import { Router } from 'express';

export const router = Router();
router.get('/', list);

router.use(authRequired(enRoles.contentManager));
router.get('/:id', get);
router.delete('/:id', remove);
router.post('/', save);