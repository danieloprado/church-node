import { Router } from 'express';

import { authRequired } from '../../../../middlewares/authRequired';
import { details } from './details';
import { logout } from './logout';
import { opened } from './opened';
import { update } from './update';

export const router = Router({ mergeParams: true });

router.use(authRequired());
router.get('/', details);
router.post('/', update);
router.post('/notification-token', opened);
router.post('/app-opened', opened);
router.post('/logout', logout);