import { resolve } from 'node:path';
import fs from 'node:fs';
import { IStorageProvider } from '../IStorageProvider';
import { S3 } from 'aws-sdk';
import { UploadConfig } from '@config/Upload';
import mime from 'mime';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(UploadConfig.tmpFolder, file);

    // const fileContent = await fs.promises.readFile(originalName);
    const fileStream = fs.createReadStream(originalName);

    const ContentType = mime.getType(originalName);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: 'public-read',
        Body: fileStream,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalName);

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };
