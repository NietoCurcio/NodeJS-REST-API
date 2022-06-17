import multer from 'multer';
import { resolve } from 'node:path';
import { randomBytes } from 'node:crypto';

export const UploadConfig = {
  upload: (folder: string) => {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileHash = randomBytes(16).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
