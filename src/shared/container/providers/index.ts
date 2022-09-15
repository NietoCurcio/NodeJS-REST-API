import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
);

container.register<IMailProvider>('EtherealMailProvider', {
  useValue: new EtherealMailProvider(),
});

const storage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.register<IStorageProvider>('StorageProvider', {
  useValue: new storage[process.env.DISK](),
});
