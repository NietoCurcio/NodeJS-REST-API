import multer from 'multer';
import { resolve } from 'node:path';
import { randomBytes } from 'node:crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export const UploadConfig = {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
