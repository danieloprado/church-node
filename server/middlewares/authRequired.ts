import { enRoles } from '../interfaces/churchUser';
import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';

export function authRequired(roles: enRoles | enRoles[] = null): any {

  return (req: Request, res: Response, next: NextFunction): any => {
    if (req.method === 'OPTIONS') {
      return next();
    }

    if (!req.user) {
      return res.status(401).json('Senta lá Cláudia!');
    }

    if (!roles) {
      return next();
    }

    roles = <enRoles[]>_.flattenDeep([roles, ['sysAdmin', 'admin']]);

    const isAuthorized = _.intersection(roles, req.user.roles).length > 0;
    if (!isAuthorized) {
      return res.status(403).json('Senta lá Cláudia!');
    }

    return next();
  };

}
