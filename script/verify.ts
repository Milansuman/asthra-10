import { triedAsync } from '@/lib/utils';
import { razorpay } from '@/logic/payment';
import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter Order ID: ', (orderId) => {
  checkPaymentStatus(orderId);
  rl.close();
});

const checkPaymentStatus = async (orderId: string) => {
  const { data, error, isSuccess } = await triedAsync(
    razorpay.orders.fetchPayments(orderId.trim())
  );

  if (isSuccess) {
    console.log(data);
  } else {
    console.log(error);
  }
};
