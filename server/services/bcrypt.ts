import * as bcrypt from 'bcrypt-nodejs';
import * as settings from '../settings';

export async function hash(password: string): Promise<string> {
  return await new Promise<string>((resolve, reject) => {

    bcrypt.genSalt(settings.bcryptSaltFactor, (err: any, salt: string) => {
      if (err) return reject(err);

      bcrypt.hash(password, salt, null, (err: any, hash: string) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });

  });
}

export async function compare(hash: string, password: string): Promise<void> {
  return await new Promise<void>((resolve, reject) => {

    bcrypt.compare(password, hash, (err: any, isMatch: boolean) => {
      if (err || !isMatch) return reject(new Error(err || 'bcript-invalid'));
      resolve();
    });

  });
}
