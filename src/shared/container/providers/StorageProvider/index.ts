import { container } from 'tsyringe';
import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { IStorageProvider } from './IStorageProvider';

const storage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.register<IStorageProvider>('StorageProvider', {
  useValue: new storage[process.env.DISK](),
});
