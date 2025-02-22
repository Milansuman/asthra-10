// import { api } from '@/trpc/server';

export default async function Page({
  params,
}: { params: Promise<{ id: string }> }) {
  // const data = await api.transaction.failedPurchase.mutate({
  //   id: params.id,
  // });

  const { id } = await params;

  return (
    <>
      <div className="flex h-full w-full flex-wrap justify-center gap-1 py-20">
        {JSON.stringify(id)}
      </div>
    </>
  );
}
