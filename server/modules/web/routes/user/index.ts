import { Router } from 'express';
import { authRequired } from '../../../../middlewares/authRequired';
import { becomeMember } from './becomeMember';
import { byEmail } from './byEmail';
import { count } from './count';
import { enRoles } from '../../../../interfaces/churchUser';
import { list } from './list';
import { remove } from './remove';
import { roles } from './roles';
import { save } from './save';

export const router = Router();

router.get('/', list);
router.get('/count', count);
router.get('/roles', roles);
router.get('/by-email/:email', byEmail);
router.delete('/:userId', remove);
router.post('/become-member', authRequired(enRoles.peopleManager), becomeMember);
router.post('/', authRequired(enRoles.peopleManager), save);