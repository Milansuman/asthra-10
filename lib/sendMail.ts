import { AsthraPass, WelcomeTemplate } from '@/components/mail';
import EventConfirmation from '@/components/mail/_templates/eventConfirmation';
import { env } from '@/env';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import type { z } from 'zod';
import type { eventZod, transactionsZod, userZod } from './validator';

type EventTicket = Partial<z.infer<typeof eventZod>>;
type TransactionCard = Partial<z.infer<typeof transactionsZod>>;
type UserData = Partial<z.infer<typeof userZod>>;

type AsthraPassType = {
  templateName: 'asthraPass';
  data: {
    toMail: string;
    eventId: string;
    eventName: string;
    personName: string;
  };
};

export type InvitationCard = {
  templateName: 'invitation';
  data: { toMail: string; personName: string };
};

export type EventConfirmationType = {
  templateName: 'eventPass';
  data: {
    user: UserData;
    eventName: string | null;
    eventSecret: string | null;
    transactions: TransactionCard;
  };
};

export type EmailTemplate =
  | AsthraPassType
  | InvitationCard
  | EventConfirmationType;

type MailOptions = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

const isAsthraPass = (data: EmailTemplate): data is AsthraPassType => {
  return data.templateName === 'asthraPass';
};

const isInvitation = (data: EmailTemplate): data is InvitationCard => {
  return data.templateName === 'invitation';
};

const isEventPass = (data: EmailTemplate): data is EventConfirmationType => {
  return data.templateName === 'eventPass';
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

const renderMail = async (templateData: EmailTemplate) => {
  let emailTemplateHTML = '';
  let to = '';
  let subject = '';

  if (isAsthraPass(templateData)) {
    const { eventId, eventName, personName, toMail } = templateData.data;
    emailTemplateHTML = await render(
      AsthraPass({ eventId, eventName, personName })
    );
    to = toMail;
    subject =
      'Invitation to Asthra 8.0: A Fusion of Technology, Games, and Culture! 🚀🎮🎭';
  } else if (isInvitation(templateData)) {
    const { personName, toMail } = templateData.data;
    emailTemplateHTML = await render(WelcomeTemplate({ personName }));
    to = toMail;
    subject = 'Your Registration Confirmed for Asthra 8.0! 🎉';
  } else if (isEventPass(templateData)) {
    const { eventName, eventSecret, transactions, user } = templateData.data;
    emailTemplateHTML = await render(
      EventConfirmation({ user, eventName, eventSecret, transactions })
    );
    to = user.email!;
    subject = 'Your Registration Confirmed for Asthra 8.0! 🎉';
  }
  const mailOptions: MailOptions = {
    to,
    subject,
    html: emailTemplateHTML,
    text: 'Welcome to ASTHRA  8.O on  SJCET',
  };
  return mailOptions;
};

export const sendMail = async (templateData: EmailTemplate) => {
  const mailOptions = await renderMail(templateData);
  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false };
  }
};
