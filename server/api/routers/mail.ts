import AsthraPass from '@/components/mail/_templates/asthraPass';
import CertificateReadyEmail from '@/components/mail/_templates/certificateReady';
import EventConfirmation from '@/components/mail/_templates/eventConfirmation';
import PaymentConfirmationEmail from '@/components/mail/_templates/paymentConfirmation';
import WelcomeTemplate from '@/components/mail/_templates/welcome';
import ReminderTemplate from '@/components/mail/_templates/reminder';
import { getHTML, sentMail } from '@/lib/mail';
import { currentAsthraCount } from '@/logic';

import type { inferRouterInputs } from '@trpc/server';
import type { generateMailRouter } from './mailRoute';

export type MailRouter = inferRouterInputs<typeof generateMailRouter>;

const purchaseConfirm = async (input: MailRouter['purchaseConfirm']) => {
  const { to, user, event, userRegisteredEvent, transactions } = input;
  const { isSuccess, error } = await sentMail({
    to,
    html: await getHTML(PaymentConfirmationEmail, {
      user,
      event,
      userRegisteredEvent,
      transactions,
    }),
    subject: `Event Confirmation - ${event.name}`,
    text: `You have successfully registered for ${event.name} on ASTHRA ${currentAsthraCount}.`,
  });

  if (!isSuccess) console.error(error);
};

const Reminder = async (input: Parameters<typeof ReminderTemplate>[0]) => {
  const { user, data } = input;

  const { isSuccess, error } = await sentMail({
    to: user.email,
    html: await getHTML(ReminderTemplate, {
      user,
      data,
    }),
    subject: 'Event Reminder - ASTHRA 9',
    text: `It's time for the event. Don't forget to join us.`,
  });

  if (!isSuccess) console.error(error);
};

const EventConfirm = async (input: MailRouter['eventConfirm']) => {
  const { user, to, event, userRegisteredEvent } = input;

  const { isSuccess, error } = await sentMail({
    to,
    html: await getHTML(EventConfirmation, {
      user,
      event,
      userRegisteredEvent,
    }),
    subject: `Event Confirmation - ${event.name}`,
    text: `You have successfully registered for ${event.name} on ASTHRA ${currentAsthraCount}.`,
  });

  if (!isSuccess) console.error(error);
};

const asthraPass = async (input: MailRouter['asthraPass']) => {
  const { to, user, userRegisteredEvent, transactions } = input;

  const { isSuccess, error } = await sentMail({
    to,
    html: await getHTML(AsthraPass, {
      user,
      userRegisteredEvent,
      transactions: transactions,
    }),
    subject: 'Your Asthra Pass',
    text: `Here is your Asthra Pass for ASTHRA ${currentAsthraCount}.`,
  });

  if (!isSuccess) console.error(error);
};

const certificateReady = async (input: MailRouter['certificateReady']) => {
  const { isSuccess, error } = await sentMail({
    to: input.email,
    html: await getHTML(CertificateReadyEmail, {
      personName: input.name ?? '',
    }),
    subject: 'Your Certificate is Ready',
    text: 'Your certificate is ready for download. Please visit the profile section to download it.',
  });

  if (!isSuccess) console.error(error);
};

const welcome = async (input: MailRouter['welcome']) => {
  const { name, email } = input;
  const { isSuccess, error } = await sentMail({
    to: email,
    html: await getHTML(WelcomeTemplate, {
      personName: name ?? email,
    }),
    subject: `Welcome to Asthra ${currentAsthraCount}`,
    text: `Welcome to ASTHRA ${currentAsthraCount} on SJCET.`,
  });

  if (!isSuccess) console.error(error);
};

export default {
  purchaseConfirm,
  EventConfirm,
  asthraPass,
  certificateReady,
  welcome,
  Reminder,
};
