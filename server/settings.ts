export const sentryKey = process.env.SENTRY_KEY;
export const port = process.env.NODE_PORT || 3000;
export const env = (process.env.NODE_ENV || 'development').trim();
export const testLocal = !!process.env.TEST_LOCAL;
export const bcryptSaltFactor = env === 'test' ? 4 : 11;

export const isProduction = env === 'production';
export const isDevelopment = env === 'development';
export const isTest = env === 'test';

/* tslint:disable */
export const auth = {
  timeout: 480, // 8 hours
  appTimeout: 1440, // 24 hours
  resetPasswordTimeout: 1 * 60 * 24, //2 days
  secret: new Buffer('RSd7w8utAWSjmJewFewfEWfwuiwhJKuoTQZH8GrR80YNFpQ3jKnDRMPDuwqaODObyyX0LS', 'base64').toString('utf8')
};
/* tslint:enable */

export const mail = {
  from: process.env.MAILGUN_FROM,
  credentials: {
    apiKey: process.env.MAILGUN_APIKEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};

export const facebook = {
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  scopes: ['email']
};

export const google = {
  apiKey: process.env.GOOGLE_API_KEY,
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  scopes: [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
};

export const firebaseKey = process.env.FIREBASE_KEY;