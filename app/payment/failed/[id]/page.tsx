import { api } from "@/trpc/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Plusbox from "@/components/madeup/box";
import FailureActions from "../../components/FailuteActions";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await api.sjcetPay.failedPurchase({
    id: id,
  });

  return (
    <div className="container h-screen flex items-center justify-center max-w-5xl">
      <Plusbox className="p-2 w-fit">
        <Card>
          <CardHeader className="p-6">
            <CardTitle>
              Oops! Payment of ₹{data.transaction.amount} Failed
            </CardTitle>
            <p>
              Something went wrong with your{" "}
              <span className="font-semibold">{data.event?.name}</span> pass.
            </p>
          </CardHeader>
          <CardContent className="pt-8 pb-6 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <Plusbox className="p-2">
                  <div className="flex gap-2 flex-row items-center">
                    <Image
                      width={80}
                      height={100}
                      src={data.event?.poster || "/assets/poster.png"}
                      alt={data.event?.name || "Asthra Event"}
                    />
                    <h4 className="text-xl font-semibold">{data.event?.name}</h4>
                  </div>
                </Plusbox>
                <div className="space-y-3">
                  <p className="text-md leading-relaxed">
                    Mission aborted! Payment didn’t go through – no worries, hit retry
                    and secure your {data.event?.name} spot!
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 justify-center text-center">
                <div className="text-6xl font-bold text-red-500">X</div>
                <p className="text-lg font-semibold">Transaction Failed</p>
                <p className="text-sm text-white max-w-xs">
                  Looks like we hit a snag. Don’t give up – your epic adventure is
                  still within reach!
                </p>
              </div>
            </div>
          </CardContent>
          {data.event?.name && <FailureActions eventName={data.event?.name} />}
        </Card>
      </Plusbox>
    </div>
  );
}