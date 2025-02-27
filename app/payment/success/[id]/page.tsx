import { verifySignature } from "@/logic/payment";
import { api } from "@/trpc/server";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QRCode from "react-qr-code";
import Image from "next/image";
import Plusbox from "@/components/madeup/box";
import SuccessActions from "../../components/SuccessActions";


const razorQueryZod = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
});

type RazorQueryZod = z.infer<typeof razorQueryZod>;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    [key in keyof RazorQueryZod]: string | string[] | undefined;
  }>;
}) {
  const { id } = await params;
  const queryParams = await searchParams;

  const { data: razorData, success } = razorQueryZod.safeParse(queryParams);

  if (success) {
    const isSuccess = verifySignature({
      ...razorData,
    });

    if (!isSuccess) {
      return "Payment verification failed";
    }
  }

  const data = await api.sjcetPay.successPurchase({
    id: id,
  });



  return (
    <div className="container h-screen flex items-center justify-center max-w-5xl">
      <Plusbox className="p-2 w-fit">
        <Card>
          <CardHeader className="p-6">
            <CardTitle>
              ₹{data.transaction.amount} Payment Successful!
            </CardTitle>
            <p className="text-md font-light italic">
              Your <span className="font-semibold">{data.event?.name}</span> pass is
              locked and loaded!
            </p>
          </CardHeader>
          <CardContent className="pt-8 pb-6 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <Plusbox className="p-2">
                  <div className="flex gap-2 flex-row">
                    <Image
                      width={80}
                      height={100}
                      src={data.event?.poster || "/assets/poster.png"}
                      alt={data.event?.name ?? "Asthra Event"}
                    />
                    <div>
                      <h4>{data.event?.name}</h4>
                    </div>
                  </div>
                </Plusbox>
                <div className="space-y-3 text-sm font-medium">
                  <p className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider">Launch Zone</span>
                    <span className="text-lg font-semibold">{data.event?.venue}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider">Blast-Off</span>
                    <span className="text-lg font-semibold">
                      {data.event?.dateTimeStarts &&
                        new Date(data.event?.dateTimeStarts).toLocaleString()} –{" "}
                      <span className="italic">Runs {data.event?.dateTimeEnd}</span>
                    </span>
                  </p>
                  <p className="text-md font-light leading-relaxed">
                    Welcome aboard! Your journey kicks off now – brace for an epic
                    ride! Your {data.event?.name} pass has been sent to your email –
                    check your inbox!
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 bg-white">
                  <QRCode
                    size={160}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={data.event?.id || ""}
                    viewBox="0 0 256 256"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          {data.event?.name && <SuccessActions eventName={data.event.name} />}
        </Card>
      </Plusbox>
    </div>
  );
}