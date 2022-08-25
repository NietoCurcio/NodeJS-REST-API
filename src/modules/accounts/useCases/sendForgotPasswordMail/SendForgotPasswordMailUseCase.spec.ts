import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';
import { EtherealMailProvider } from '../../../../shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import { AppError } from '@shared/errors/AppError';

jest.mock(
  '../../../../shared/container/providers/MailProvider/implementations/EtherealMailProvider'
);

const mockSendMail = jest.fn();
(EtherealMailProvider as any).mockImplementation(() => {
  return {
    sendMail: mockSendMail,
  };
});

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: EtherealMailProvider;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    mailProvider = new EtherealMailProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '123456',
      email: 'test@gmail.com',
      name: 'test name',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('test@gmail.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('nonexistentuser@gmail.com')
    ).rejects.toEqual(new AppError('User does not exists', 404));
  });

  it('should create a users tokens', async () => {
    const createUsersTokens = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    await usersRepositoryInMemory.create({
      driver_license: '123456',
      email: 'test@gmail.com',
      name: 'test name',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('test@gmail.com');

    expect(createUsersTokens).toHaveBeenCalled();
  });
});
