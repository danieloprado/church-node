import 'source-map-support/register';

import * as chaiAsPromise from 'chai-as-promised';
import * as db from './db';

import { expect, use } from 'chai';

import { env } from './settings';

use(chaiAsPromise);
console.log('Environment: ', env);

describe('db', () => {

  it('should migrate memory db', () => {
    return expect(db.connectAndMigrate()).to.be.eventually.fulfilled;
  });

});
