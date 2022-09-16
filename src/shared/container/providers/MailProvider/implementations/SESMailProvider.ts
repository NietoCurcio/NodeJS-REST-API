import { IMailProvider } from '../IMailProvider';
import { SES } from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'node:fs';

class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    try {
      const templateFileContent = fs.readFileSync(path).toString('utf-8');

      const templateParse = handlebars.compile(templateFileContent);

      const templateHTML = templateParse(variables);

      await this.client.sendMail({
        to,
        from: 'Rentx <felipe@nietocurcio.com>',
        subject,
        html: templateHTML,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
}

export { SESMailProvider };
