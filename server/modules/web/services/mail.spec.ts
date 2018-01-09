import { IUser } from '../../../interfaces/user';
import 'source-map-support/register';
import * as service from './mail';
import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';

use(chaiAsPromise);

describe('web/services/mail', () => {
  const user: IUser = {
    id: 1,
    email: 'danielprado.ad@gmail.com',
    firstName: 'Daniel',
    lastName: 'Prado',
    password: '$hash'
  };

  it('should send an email when user is created', () => {
    const notHashedPassword = '123';
    return expect(service.sendUserCreate(user, notHashedPassword)).to.be.fulfilled.then((mail: any) => {
      expect(mail.to).to.be.equal(user.email);
      expect(mail.template).to.be.equal('user-create');
      expect(mail.html).to.not.be.empty;
      expect(user.password).to.be.not.equal(notHashedPassword);
    });
  });

  it('should send an email when user is created', () => {
    return expect(service.sendResetPassword(user, 'token')).to.be.fulfilled.then((mail: any) => {
      expect(mail.to).to.be.equal(user.email);
      expect(mail.template).to.be.equal('user-reset-password');
      expect(mail.html).to.not.be.empty;
    });
  });

});