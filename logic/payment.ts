import { env } from '@/env';
import jsSHA from 'jssha';
import type { z } from 'zod';

import type { paymentZod, verifyPaymentZod } from '@/lib/validator/payment';

export async function verifyAsthraPayment(txnid: string) {
  const key = env.NEXT_PUBLIC_HDFC_KEY;
  const salt = env.NEXT_PUBLIC_HDFC_SALT;
  const command = 'verify_payment';
  const var1: string = txnid;

  // const hash_str: string = key + '|' + command + '|' + var1 + '|' + salt;
  const hash_str: string = `${key}|${command}|${var1}|${salt}`;

  const sha = new jsSHA('SHA-512', 'TEXT');
  sha.update(hash_str);
  const generatedHash = sha.getHash('HEX');

  const data = new URLSearchParams({
    key: key,
    hash: generatedHash,
    var1: var1,
    command: command,
  });

  const wsUrl = env.HDFC_VERIFY_TXN;

  try {
    const response = await fetch(wsUrl, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const o: string = await response.text();

    console.log(o);
    //   console.log(convertPhpArrayToJsObject(o))

    //   const valueSerialized = JSON.parse(o);

    //   if (o === 'b:0;' || (typeof valueSerialized === 'object' && valueSerialized !== null)) {
    //       console.log(valueSerialized);
    //   }

    if (o.includes('[status] => success')) {
      return 'success';
    }
    return 'failed';
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return 'failed';
  }
}

export function convertPhpArrayToJsObject(phpArrayString: string): object {
  const regex = /(\{\s*|\s*\})/g;
  let stringData = phpArrayString;
  // Remove <pre> tags if present
  stringData = stringData.replace(/<pre>/g, '').replace(/<\/pre>/g, '');

  // Replace '=>' with ':' to make it a valid JSON
  stringData = stringData.replaceAll('(', '');
  stringData = stringData
    .split('\n')
    .filter((line) => line.trim() !== '')
    .join('",\n');
  stringData = stringData.replaceAll('Array', '{');
  stringData = stringData.replaceAll('[', '"');
  stringData = stringData.replaceAll(']', '"');
  stringData = stringData.replaceAll(')', '}');

  stringData = stringData.replaceAll(/\s*=>\s*/g, ': "');
  stringData = stringData.replace(regex, '$1');
  stringData = stringData.replace(/"\{",|{",/g, '{');
  stringData = stringData.replaceAll(`",`, '},');
  stringData = stringData.replaceAll('},', '}');

  console.log(stringData);

  // Convert to object using JSON.parse
  const jsObject = JSON.parse(stringData);

  return jsObject;
}

export const generateHash = (data: z.infer<typeof paymentZod>) => {
  const hashseq = `${data.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|${'||||||||||'}${data.salt}`;

  const sha = new jsSHA('SHA-512', 'TEXT');
  sha.update(hashseq);
  const generatedHash = sha.getHash('HEX');
  return generatedHash;
};

export const verifyHash = (data: z.infer<typeof verifyPaymentZod>) => {
  const hashseq = `${data.key}|${data.command}|${data.txnid}|${data.salt}`;

  const sha = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  sha.update(hashseq);

  const generatedHash = sha.getHash('HEX');
  return generatedHash;
};

export const sentVerificationReq = async (
  data: z.infer<typeof verifyPaymentZod>,
  hash: string
) => {
  const { command, key, txnid } = data;
  const params = {
    key,
    command,
    var1: txnid,
    hash,
  };
  const formData = new URLSearchParams(params).toString();
  const wsUrl = env.HDFC_VERIFY_TXN;

  console.log(formData);

  const response = await fetch(wsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  const text = await response.text();
  return text;
  // if (text === 'b:0;' || text.trim().toLowerCase() === 'false') {
  //   console.log('Error occurred');
  //   return;
  // }

  // const valueSerialized = JSON.parse(text);
  // console.log(valueSerialized);

  // if (text.includes('[status] => success')) {
  //   console.log('Success');
  // }
};
