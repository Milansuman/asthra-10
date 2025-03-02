import { env } from '@/env';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { triedAsync } from './utils';

type MailOptions = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

const transporter = nodemailer.createTransport({
  pool: true,
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: env.NM_EMAIL,
    pass: env.NM_PASS,
  },
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getHTML = async <T extends (data: any) => React.JSX.Element>(
  template: T,
  data: Parameters<T>[0]
) => {
  return await render(template(data));
};

export const sentMail = async (mailOptions: MailOptions) => {
  return await triedAsync(
    transporter.sendMail({ from: `Asthra <${env.NM_EMAIL}>`, ...mailOptions })
  );
};
