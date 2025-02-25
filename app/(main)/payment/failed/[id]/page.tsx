export default async function Page({
  params,
  // searchParams,
}: {
  params: Promise<{ id: string }>;
  // searchParams: Promise<{
  //   [key in keyof RazorQueryZod]: string | string[] | undefined;
  // }>;
}) {
  const { id } = await params;

  return id;
}
