import { IStorageProvider } from '../IStorageProvider';
import fs from 'node:fs';
import { resolve } from 'node:path';
import { UploadConfig } from '@config/Upload';

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(UploadConfig.tmpFolder, file),
      resolve(UploadConfig.tmpFolder, folder, file)
    );
    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(UploadConfig.tmpFolder, folder, file);

    try {
      await fs.promises.stat(filename);
    } catch (err) {
      return;
    }

    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
