import { NextFunction, Request, Response } from 'express';

import { enInformativeType } from '../../../../interfaces/informative';
import * as logService from '../../../../services/log';
import * as notificationService from '../../../../services/notification';
import * as informativeService from '../../services/informative';
import * as informativeValidator from '../../validators/informative';

export async function save(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const model = await informativeValidator.validate(req.body);
    const informative = await informativeService.save(model, req.user);

    if (req.body.sendNotification) {
      const title = informative.typeId === enInformativeType.cell ?
        !req.body.id ? 'Nova mensagem da célula disponível' : 'A mensagem da célula foi atualizada' :
        !req.body.id ? 'Novo informativo está disponível' : 'O informativo foi atualizado';

      notificationService.sendAll(title, 'Toque para visualizar', {
        action: 'open-informative',
        data: { id: informative.id }
      }).catch(err => logService.exception(err));
    }

    res.json(informative);
  } catch (err) {
    next(err);
  }
}