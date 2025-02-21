'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { env } from '@/env';
import { api } from '@/trpc/react';
import Link from 'next/link';
import {} from 'razorpay';

const id = 'order_Py0l8cGksW039A';
const amount = '100';

const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const orderId = 'order_Py0l8cGksW039A';
  try {
    const paymentObject = new window.Razorpay({
      key: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Number.parseFloat(amount) * 100,
      currency: 'INR',
      name: 'Payment', //busniess name
      description: 'Payment',
      order_id: orderId,
      handler: (response) => {
        const data = {
          orderCreationId: orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        console.log(data);
      },
      theme: {
        color: '#3399cc',
      },
    });
    paymentObject.on('payment.failed', (response) => {
      console.log(response);
      // @ts-ignore
      alert(response?.error?.description);
    });
    paymentObject.open();
  } catch (error) {
    console.error(error);
  }
};

// {
//   amount: 100, amount_due;
//   : 100,
//   amount_paid: 0,
//   attempts: 0,
//   created_at: 1740064647,
//   currency: 'INR',
//   entity: 'order',
//   id: 'order_Py0l8cGksW039A',
//   notes: [],
//   offer_id: null,
//   receipt: 'rcp1',
//   status: 'created'
// }

const Home = () => {
  // const { data } = api.payment.order.useQuery(
  //   {
  //     amount: 100,
  //     id: '693633a8-0a1a-4763-9c61-af91b5e11296',
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     refetchOnReconnect: false,
  //     refetchOnMount: false,
  //     refetchInterval: false,
  //     refetchIntervalInBackground: false,
  //     trpc: {},
  //     staleTime: Number.POSITIVE_INFINITY,
  //   }
  // );

  console.log('order_Py0l8cGksW039A');

  return (
    <section className="container h-screen flex flex-col justify-center items-center gap-10 text-black">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
        Checkout
      </h1>
      <Card className="max-w-[25rem] space-y-8">
        <CardHeader>
          <CardTitle className="my-4">Continue</CardTitle>
          <CardDescription>
            By clicking on pay you'll purchase your plan subscription of Rs
            10/month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={processPayment}>
            <Button className="w-full" type="submit">
              Pay
              {/* {loading ? '...loading' : 'Pay'} */}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex">
          <p className="text-sm text-muted-foreground underline underline-offset-4">
            Please read the
            <Link href="/REFUND_POLICY_SJCET.pdf">
              Privacy Policy, Refund Policy
            </Link>
            and
            <Link href="/Mandatory_policy_sjcet.pdf">Mandatory Policy</Link>
            before proceeding
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Home;
