import { enRoles } from '../../../../interfaces/churchUser';
import { authRequired } from '../../../../middlewares/authRequired';
import { current } from './current';
import { list } from './list';
import { saveCurrent } from './save-current';
import { Router } from 'express';

export const router = Router();
router.get('/', list);
router.get('/current', current);

router.use(authRequired(enRoles.admin));
router.post('/current', saveCurrent);