import * as fs from 'fs';
import * as inlineCss from 'inline-css';
import * as mailgunApi from 'mailgun-js';
import * as pug from 'pug';
import * as settings from '../settings';
import * as urlService from './url';

let mailgun: any;

if (!settings.isTest) {
  mailgun = mailgunApi(settings.mail.credentials);
}

interface IMail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export async function send(to: string, subject: string, template: string, data: any): Promise<void> {
  data = setDefaultVariables(data);

  return await new Promise<any>(async (resolve, reject) => {
    const html = await renderTemplate(template, data);
    const mail: IMail = { from: settings.mail.from, to, subject, html };

    if (settings.isTest) {
      (<any>mail).template = template;
      resolve(mail);
      return;
    }

    if (settings.isDevelopment) {
      await outputFile(mail);
      resolve(mail);
      return;
    }

    mailgun.messages().send(mail, (error: any, body: any) => {
      if (error) return reject(error);
      return resolve(body);
    });
  });
}

async function outputFile(mail: IMail): Promise<IMail> {
  return await new Promise<any>(async (resolve, reject) => {
    const filePath = `./output-emails/${Date.now()}.html`;

    fs.exists('./output-emails', exists => {
      if (!exists) fs.mkdirSync('./output-emails');
      fs.writeFile(filePath, mail.html, () => resolve(mail));
    });
  });
}

async function renderTemplate(template: string, data: any): Promise<string> {
  let html = pug.renderFile(`${__dirname}/../templates/${template}.pug`, data);
  return await inlineCss(html, { url: urlService.home() || 'no-url' });
}

function setDefaultVariables(data: any): any {
  data.urlSite = urlService.home();
  data.currentYear = new Date().getFullYear();
  return data;
}