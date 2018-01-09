import { authRequired } from '../../../../middlewares/authRequired';
import { changeChurch } from './changeChurch';
import { changePassword } from './changePassword';
import { router as facebookRouter } from './facebook';
import { router as googleRouter } from './google';
import { login } from './login';
import { resetPassword } from './resetPassword';
import { sendResetPassword } from './sendResetPassword';
import { Router } from 'express';

export const router = Router();
router.post('/login', login);
router.post('/send-reset', sendResetPassword);
router.post('/reset-password', resetPassword);
router.use('/facebook', facebookRouter);
router.use('/google', googleRouter);

router.use(authRequired());

router.post('/change-church', changeChurch);
router.post('/change-password', changePassword);
