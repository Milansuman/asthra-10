import { api } from "@/trpc/server";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Plusbox from "@/components/madeup/box";
import { Button } from "@/components/ui/button";
import { triedAsync } from "@/lib/utils";
import { getTimeUtils } from "@/logic";


// const razorQueryZod = z.object({
//   razorpayOrderId: z.string(),
//   razorpayPaymentId: z.string(),
//   razorpaySignature: z.string(),
// });

// type RazorQueryZod = z.infer<typeof razorQueryZod>;

export default async function Page({
  params,
  // searchParams,
}: {
  params: Promise<{ id: string }>;
  // searchParams: Promise<{
  //   [key in keyof RazorQueryZod]: string | string[] | undefined
  // }>;
}) {
  const { id } = await params;
  // const queryParams = await searchParams;

  // console.log(queryParams);

  // const { data: razorData, success } = razorQueryZod.safeParse(queryParams);

  // if (success) {
  //   const isSuccess = verifySignature({
  //     ...razorData,
  //   });

  //   if (!isSuccess) {
  //     return "Payment verification failed";
  //   }
  // }

  const { isSuccess, data, error } = await triedAsync(api.sjcetPay.successPurchase({
    orderId: id,
  }));

  if (!isSuccess || !data) {
    console.error(error);
    return (
      <div className="container h-screen flex items-center justify-center">
        <Card>
          <CardHeader className="p-6">
            <CardTitle>
              {error?.name ?? "Error"}
            </CardTitle>
            <CardDescription>
              {error?.message ?? "Something went wrong!"}
            </CardDescription>
            <CardDescription>
              Please contact the event organizer for further assistance.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container h-screen flex items-center justify-center max-w-3xl">
      <Plusbox className="p-2 w-fit">
        <Card>
          <CardHeader className="p-6">
            <CardTitle>
              ₹{data.transaction.amount} Payment Successful!
            </CardTitle>
            <CardDescription>
              Your <span className="font-semibold">{data.event.name}</span> pass is
              locked and loaded!
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 pb-6 px-6">
            <div className="">
              <div className="space-y-5">
                <Plusbox className="p-2 w-fit">
                  <div className="flex gap-2 flex-row">
                    <Image
                      width={80}
                      height={100}
                      src={data.event.poster || "/assets/poster.png"}
                      alt={data.event.name ?? "Asthra Event"}
                    />
                    <div>
                      <h4>{data.event.name}</h4>
                      <p>{data.event.id}</p>
                      <p>{data.event.secret}</p>
                    </div>
                  </div>
                </Plusbox>
                <div className="space-y-3 text-sm font-medium">
                  <p className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider">Launch Zone</span>
                    <span className="text-lg font-semibold">{data.event.venue}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider">Blast-Off</span>
                    <span className="text-lg font-semibold">
                      {data.event.dateTimeStarts &&
                        getTimeUtils(data.event.dateTimeStarts)} -{" "}
                      <span className="italic">Runs {data.event.dateTimeEnd}</span>
                    </span>
                  </p>
                  <p className="text-md font-light leading-relaxed">
                    Welcome aboard! Your journey kicks off now - brace for an epic
                    ride! Your {data.event.name} pass has been sent to your email -
                    check your inbox!
                  </p>
                </div>
              </div>

            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button
              link={`/event/${data.event.id}`} variant="glass"
            >
              Show Ticket
            </Button>
            <Button link={"/profile"} variant="glass">
              Back to Profile
            </Button>
          </CardFooter>
        </Card>
      </Plusbox>
    </div>
  );
}