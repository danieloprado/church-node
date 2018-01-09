import * as authService from '../../../services/auth';
import * as urlService from '../../../../../services/url';
import * as googleService from '../../../../../services/google';
import { NextFunction, Request, Response } from 'express';

export async function callback(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (req.query.error && !req.query.code) {
      res.redirect(urlService.home());
      return;
    }

    const accessToken = await googleService.getAccessToken(req.query.code);
    const userInfo = await googleService.getUserInfo(accessToken);
    const token = await authService.loginBySocial(userInfo);

    res.redirect(urlService.loginSocial(token));
  } catch (err) {
    console.log(err);
    if (err.name === 'google-error') {
      return res.redirect(urlService.loginMessage('invalid-token'));
    }

    if (err.message === 'user-not-found' || err.message === 'user-no-access') {
      return res.redirect(urlService.loginMessage(err.message));
    }

    next(err);
  }

}