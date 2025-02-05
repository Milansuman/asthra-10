import { env } from '@/env';

async function Handler(
  request: Request,
  { params }: { params: Promise<{ id: string; status: string }> }
) {
  const { id, status } = await params;

  return Response.redirect(
    new URL(`/payment/${status}/${id}`, env.NEXT_PUBLIC_WEBSITE_URL),
    302
  );
}

export default {
  POST: Handler,
  GET: Handler,
};
