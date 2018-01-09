import * as fs from 'fs';
import * as uuid from 'uuid';

const DIR = 'upload';

export async function move(source: string): Promise<string> {
  await checkFolder();
  const dist = `${uuid()}.${source.split('.').pop()}`;

  return new Promise<string>((resolve, reject) => {
    fs.createReadStream(source)
      .pipe(fs.createWriteStream(`${DIR}/${dist}`))
      .on('error', err => reject(err))
      .on('close', () => {
        fs.unlink(source, err => {
          err ? reject(err) : resolve(dist);
        });
      });
  });
}

export async function save(filename: string, base64: string): Promise<string> {
  await checkFolder();

  const ext = filename.split('.').pop();
  base64 = base64.split(',').pop();
  filename = `${uuid.v4()}.${ext}`;

  return new Promise<string>((resolve, reject) => {
    fs.writeFile(getPath(filename), base64, <any>'base64', (error) => {
      if (!error) return resolve(filename);
      reject(error);
    });
  });
}

export function getPath(filename: string): string {
  return `${DIR}/${filename}`;
}

export function remove(path: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!path) return new Error('provide a path to exlude');

    fs.unlink(getPath(path), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

function checkFolder(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.exists(DIR, (exists) => {
      if (exists) return resolve();

      fs.mkdir(DIR, (error) => {
        if (!error) return resolve();
        reject(error);
      });
    });
  });
}
