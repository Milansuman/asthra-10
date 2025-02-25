import { verifySignature } from "@/logic/payment";
import { z } from "zod";

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

  const { data, success } = razorQueryZod.safeParse(await searchParams);

  if (!success) {
    return "Nop";
  }

  const isSuccess = verifySignature({
    ...data,
  });

  if (!isSuccess) {
    return "Nop";
  }

  return id;
}
